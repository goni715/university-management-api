import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { changePasswordService, forgetPasswordService, loginUserService, refreshTokenService } from './auth.service';
import config from '../../config';

const loginUser = catchAsync(async (req, res) => {
  const result = await loginUserService(req.body);
  const { accessToken, refreshToken, needsPasswordChange} = result;

  //set sookie
  res.cookie('refreshToken', refreshToken, {
    secure: config.Node_Env === "production", //true-https or false-http
    httpOnly: true
  })


  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'User is logged in successfully !',
    data: {
      accessToken,
      needsPasswordChange
    }
  });
});




const changePassword = catchAsync(async (req, res) => {
  const user = req?.user;
  
  const result = await changePasswordService(user, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Password is updated successfully !',
    data: result
  });
});




const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  
  const result = await refreshTokenService(refreshToken);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Access token is retrieved successfully !',
    data: result
  });
});




const forgetPassword = catchAsync(async (req, res) => {
  const { id } = req.body;

  const result = await forgetPasswordService(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Reset link is sent successfully !',
    data: result
  });
});



export { loginUser, changePassword, refreshToken, forgetPassword };
