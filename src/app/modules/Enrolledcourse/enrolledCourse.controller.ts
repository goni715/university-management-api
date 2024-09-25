import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createEnrolledCourseService } from "./enrolledCourse.service";


const createEnrolledCourse = catchAsync(async(req, res)=>{
    const userId = req.user.userId;
    const result = await createEnrolledCourseService(userId, req.body);
    sendResponse(res, {
        statusCode: 201,
        status: true,
        message: 'Enrolled Course is created successfully',
        data: result,
     })
})



export {
    createEnrolledCourse
}