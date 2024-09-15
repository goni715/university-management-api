import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createSemesterRegistrationService } from "./semesterRegistration.service";


const createSemesterRegistration = catchAsync(async(req, res, next) => {
    const result = await createSemesterRegistrationService(req.body)
    sendResponse(res, {
        statusCode: 201,
        status: true,
        message: 'Semester Registration is created successfully',
        data: result,
     })
});



export {
    createSemesterRegistration
}