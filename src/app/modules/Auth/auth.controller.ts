import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { changePasswordService, loginUserService } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await loginUserService(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'User is logged in successfully !',
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const user = req?.user;
  
  const result = await changePasswordService(user, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Password is updated successfully !',
    data: result,
  });
});

export { loginUser, changePassword };
