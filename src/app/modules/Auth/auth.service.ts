import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import UserModel from "../user/user.model"
import { TChangePassword, TLoginUser } from "./auth.interface"
import { checkPassword, hashedPassword } from "./auth.utils";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../../config";


const loginUserService = async (payload: TLoginUser) => {

    const {id, password} = payload || {};

    //check if the user is exist
    const isUserExists = await UserModel.findOne({ id: id }).select('+password');
    if(!isUserExists){
        throw new AppError(httpStatus.NOT_FOUND, `This user is not found`);
    }


   
     //check if the user is already deleted
     const isDeleted = isUserExists?.isDeleted;
     if(isDeleted){
         throw new AppError(httpStatus.FORBIDDEN, `This user is already deleted`);
     }


      //check if the user is already deleted
      const blockStatus = isUserExists?.status;
      if(blockStatus === "blocked"){
          throw new AppError(httpStatus.FORBIDDEN, `This user is blocked`);
      }

      //checking if the password is not correct
      const isPasswordMatched = await checkPassword(password, isUserExists?.password) //return true or false
      if(!isPasswordMatched){
          throw new AppError(httpStatus.FORBIDDEN, `Wrong Password`);
      }


    //create token
    const jwtPayload = {
        userId: isUserExists.id,
        role: isUserExists.role
    }

    const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, { expiresIn: '10d' });
      
    return {
        accessToken,
        needsPasswordChange: isUserExists.needsPasswordChange
    }
}




const changePasswordService = async (userData: JwtPayload, payload: TChangePassword )=>{
    const {userId, role} = userData;
    const {oldPassword, newPassword} = payload;
   
     //check if the user is exist
     const user = await UserModel.findOne({ id: userId }).select('+password');
    
    //checking if the password is not correct
    const isPasswordMatched = await checkPassword(oldPassword, user?.password as string) //return true or false
    if(!isPasswordMatched){
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
            passwordChangedAt: new Date()
        }
    )


    return result;
}


export{
    loginUserService,
    changePasswordService
}