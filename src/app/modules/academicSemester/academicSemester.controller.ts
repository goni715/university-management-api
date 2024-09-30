import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createAcademicSemesterService, getAllSemestersService, getSingleSemesterService, updateSemesterService } from "./academicSemester.service";

const createAcademicSemester = catchAsync(async(req, res, next) => {
    const result = await createAcademicSemesterService(req.body)
    sendResponse(res, {
        statusCode: 201,
        status: true,
        message: 'Academic Semester is created successfully',
        data: result,
     })
});



const getAllSemesters = catchAsync( async (req, res) =>{
    const result = await getAllSemestersService(req.query);
    sendResponse(res, {
        statusCode: 200,
        status: true,
        message: 'Academic Semesters are retrieved successfully',
        meta: result.meta,
        data: result.result,
     })
})


const getSingleSemester = catchAsync( async (req, res) =>{
    const {id} = req.params;
    const result = await getSingleSemesterService(id);
    sendResponse(res, {
        statusCode: 200,
        status: true,
        message: 'Single Academic Semester is retrieved successfully',
        data: result,
     })
});


const updateSemester = catchAsync( async (req, res) =>{
    const {id} = req.params;
    const result = await updateSemesterService(id, req.body);

    sendResponse(res, {
        statusCode: 200,
        status: true,
        message: 'Academic Semester is updated successfully',
        data: result,
     })
});



export { createAcademicSemester, getAllSemesters, getSingleSemester, updateSemester };
