import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { changePasswordService, loginUserService } from './auth.service';
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

export { loginUser, changePassword };
