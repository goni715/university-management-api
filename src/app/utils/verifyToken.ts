import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';

const verifyToken = async (token:string, secretKey:string) => {
    try{
       const decoded = jwt.verify(
          token,
          secretKey,
        ) as JwtPayload;

        return decoded;
    }
    catch(err){
       throw new AppError(httpStatus.UNAUTHORIZED, `You are not authorized`);
    }
    
 }


export default verifyToken;