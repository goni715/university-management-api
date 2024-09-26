import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createEnrolledCourseService, updateEnrolledCourseMarksService } from "./enrolledCourse.service";


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


const updateEnrolledCourseMarks = catchAsync(async(req, res)=>{
    const userId = req.user.userId;
    const result = await updateEnrolledCourseMarksService(userId, req.body);
    sendResponse(res, {
        statusCode: 200,
        status: true,
        message: 'Enrolled Course Marks is updated successfully',
        data: result,
     })
})



export {
    createEnrolledCourse,
    updateEnrolledCourseMarks
}