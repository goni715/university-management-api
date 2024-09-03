import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createAcademicSemesterService } from "./academicSemester.service";

const createAcademicSemester = catchAsync(async(req, res, next) => {
    const result = await createAcademicSemesterService(req.body)
    sendResponse(res, {
        statusCode: 201,
        status: true,
        message: 'Academic Semester is created successfully',
        data: result,
     })
});

export { createAcademicSemester };
