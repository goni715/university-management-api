import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import UserModel from "../user/user.model"
import { TLoginUser } from "./auth.interface"
import bcrypt from 'bcryptjs';


const loginUserService = async (payload: TLoginUser) => {

    const {id, password} = payload || {};

    //check if the user is exist
    const isUserExists = await UserModel.findOne({ id: id });
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
      const isPasswordMatched = await bcrypt.compare(password, isUserExists?.password); //return true or false
      if(!isPasswordMatched){
          throw new AppError(httpStatus.FORBIDDEN, `Wrong Password`);
      }

    return payload
}



export{
    loginUserService
}