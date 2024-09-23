import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import UserModel from '../modules/user/user.model';
import { isJWTIssuedBeforePasswordChanged } from '../modules/Auth/auth.utils';

const authMiddleware = (...requiredRoles: TUserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, `You are not unauthorized !`);
    }

    try {
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;

      const { role, userId, iat } = decoded as JwtPayload;

      //check if the user is exist
      const user = await UserModel.findOne({ id: userId });
      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, `This user is not found`);
      }

      //check if the user is already deleted
      const isDeleted = user?.isDeleted;
      if (isDeleted) {
        throw new AppError(
          httpStatus.FORBIDDEN,
          `This user is already deleted`,
        );
      }

      //check if the user is already blocked
      const blockStatus = user?.status;
      if (blockStatus === 'blocked') {
        throw new AppError(httpStatus.FORBIDDEN, `This user is blocked`);
      }

      //check if passwordChangedAt is greater than token iat
      if (
        user?.passwordChangedAt &&
        isJWTIssuedBeforePasswordChanged(user?.passwordChangedAt, iat as number)
      ) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
      }

      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
      }

      req.user = decoded;
      next();
    } catch (err: unknown) {
      return next(
        new AppError(httpStatus.UNAUTHORIZED, 'Invalid or expired token!'),
      );
    }
  };
};

export default authMiddleware;
