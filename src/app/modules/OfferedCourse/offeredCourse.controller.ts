import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createOfferedCourseService } from "./offeredCourse.service";


const createOfferedCourse = catchAsync(async(req, res)=>{
    const result = await createOfferedCourseService(req.body);
    sendResponse(res, {
        statusCode: 201,
        status: true,
        message: 'Course is created successfully',
        data: result,
     })
});


export {
    createOfferedCourse
}
