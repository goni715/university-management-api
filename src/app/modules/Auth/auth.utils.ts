import bcrypt from 'bcryptjs';
import config from '../../config';
import jwt, { JwtPayload } from 'jsonwebtoken';


export const checkPassword = async (plainTextPass: string, hashPassword: string) => {
   return await bcrypt.compare(plainTextPass, hashPassword);
}


export const hashedPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(Number(config.bcrypt_salt_rounds));
    return await bcrypt.hash(password, salt); //hashedPassword
}

export const isJWTIssuedBeforePasswordChanged = (passwordChangedTimestamp: Date, jwtIssuedTimestamp : number) => {
   const passwordChangedTime = new Date(passwordChangedTimestamp).getTime() / 1000; //seconds 
   return passwordChangedTime > jwtIssuedTimestamp;
}


export const createToken = (jwtPayload : {userId:string, role: string}, secretKey:string, expiresIn:string) => {
   const token = jwt.sign(jwtPayload, secretKey, {
      expiresIn: expiresIn,
    });

    return token;
}



export const verifyToken = (token:string, secretKey:string) => {
   const decoded = jwt.verify(
      token,
      secretKey,
    ) as JwtPayload;

    return decoded;
}

