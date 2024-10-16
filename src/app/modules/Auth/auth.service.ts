import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import UserModel from '../user/user.model';
import { TChangePassword, TLoginUser } from './auth.interface';
import { checkPassword, createToken, hashedPassword, isJWTIssuedBeforePasswordChanged } from './auth.utils';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import sendEmail from '../../utils/sendEmail';
import verifyToken from '../../utils/verifyToken';

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
   const decoded = await verifyToken(
      token,
      config.jwt_refresh_secret as string
    )

    const { role, userId, iat } = decoded; //decoded-data

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




const forgetPasswordService = async (userId:string) => {
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

   //create token
   const jwtPayload = {
      userId: user.id,
      role: user.role,
    };
  const token = createToken(jwtPayload, config.jwt_access_secret as string, '10m');

  const resetLink = `${config.reset_password_ui_link}?id=${user.id}&token=${token}`;

  await sendEmail(user?.email, resetLink);

  return null;


}


const resetPasswordService = async (payload: {id: string, token: string, newPassword: string}) => {
  const { id, token, newPassword } = payload;
    //check if the user is exist
    const user = await UserModel.findOne({ id });
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


  //verify resetToken
  const decoded = verifyToken(token, config.jwt_access_secret as string);

  //check if id & decoded userId is not same
  if(id !== decoded?.userId){
    throw new AppError(httpStatus.FORBIDDEN, `You are forbidden`);
  }


    //hashing new password
    const hashPass = await hashedPassword(newPassword);

    const result = await UserModel.updateOne(
      {
        id: id,
        role: decoded?.role
      },
      {
        password: hashPass,
        needsPasswordChange: false,
        passwordChangedAt: new Date(),
      },
    );
  
    return result;
  


}



export { loginUserService, changePasswordService, refreshTokenService, forgetPasswordService, resetPasswordService };
