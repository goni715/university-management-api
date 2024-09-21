import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";


const authMiddleware = (...requiredRoles : TUserRole[]) => {
   return (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization;

       if(!token){
          throw new AppError(httpStatus.UNAUTHORIZED, `You are not unauthorized !`)
       }
    

      //token-verify
      jwt.verify(token, config.jwt_secret as string, (err, decoded)=>{
         if(err){
            throw new AppError(httpStatus.UNAUTHORIZED, `You are not unauthorized !`)
         }

         const {role} = decoded as JwtPayload;

         if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError(
              httpStatus.UNAUTHORIZED,
              'You are not authorized !',
            );
          }

         req.user=decoded as JwtPayload;

      //  const data = decoded as JwtPayload;
      //  req.headers.userId = data?.userId;
        next();
      });
}

}


export default authMiddleware;