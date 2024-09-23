import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import UserModel from '../user/user.model';
import { TChangePassword, TLoginUser } from './auth.interface';
import { checkPassword, createToken, hashedPassword, isJWTIssuedBeforePasswordChanged } from './auth.utils';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';

const loginUserService = async (payload: TLoginUser) => {
  const { id, password } = payload || {};

  //check if the user is exist
  const isUserExists = await UserModel.findOne({ id: id }).select('+password');
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, `This user is not found`);
  }

  //check if the user is already deleted
  const isDeleted = isUserExists?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, `This user is already deleted`);
  }

  //check if the user is already blocked
  const blockStatus = isUserExists?.status;
  if (blockStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, `This user is blocked`);
  }

  //checking if the password is not correct
  const isPasswordMatched = await checkPassword(
    password,
    isUserExists?.password,
  ); //return true or false
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, `Wrong Password`);
  }

  //create token
  const jwtPayload = {
    userId: isUserExists.id,
    role: isUserExists.role,
  };

  const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expires_in as string)
  const refreshToken = createToken(jwtPayload, config.jwt_refresh_secret as string, config.jwt_refresh_expires_in as string);


  return {
    accessToken,
    refreshToken,
    needsPasswordChange: isUserExists.needsPasswordChange,
  };
};

const changePasswordService = async (
  userData: JwtPayload,
  payload: TChangePassword,
) => {
  const { userId, role } = userData;
  const { oldPassword, newPassword } = payload;

  //check if the user is exist
  const user = await UserModel.findOne({ id: userId }).select('+password');


  //checking if the password is not correct
  const isPasswordMatched = await checkPassword(
    oldPassword,
    user?.password as string,
  ); //return true or false


  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, `Password do not match`);
  }

  //hash the newPassword
  const hashPass = await hashedPassword(newPassword);

  const result = await UserModel.updateOne(
    {
      id: userId,
      role: role
    },
    {
      password: hashPass,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return result;
};



const refreshTokenService = async(token: string) => {
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, `You are not unauthorized !`);
  }

  //verify-token
   const decoded = jwt.verify(
      token,
      config.jwt_refresh_secret as string,
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

  //create new access token
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expires_in as string);

  return {
    accessToken
  }
  
}




export { loginUserService, changePasswordService, refreshTokenService };
