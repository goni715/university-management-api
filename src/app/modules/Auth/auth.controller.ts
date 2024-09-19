import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { loginUserService } from "./auth.service";



const loginUser = catchAsync(async(req, res)=>{
    const result = await loginUserService(req.body);
    sendResponse(res, {
        statusCode: 201,
        status: true,
        message: 'User is logged in successfully !',
        data: result,
     })
})



export {
    loginUser
}