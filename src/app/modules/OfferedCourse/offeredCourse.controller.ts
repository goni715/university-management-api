import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createOfferedCourseService, updateOfferdCourseService } from "./offeredCourse.service";


const createOfferedCourse = catchAsync(async(req, res)=>{
    const result = await createOfferedCourseService(req.body);
    sendResponse(res, {
        statusCode: 201,
        status: true,
        message: 'Offered Course is created successfully',
        data: result,
     })
});


const updateOfferedCourse = catchAsync( async (req, res) =>{
    const {id} = req.params;
    const result = await updateOfferdCourseService(id, req.body);

    sendResponse(res, {
        statusCode: 200,
        status: true,
        message: 'Offered Course is updated successfully',
        data: result,
     })
});


export {
    createOfferedCourse,
    updateOfferedCourse
}
