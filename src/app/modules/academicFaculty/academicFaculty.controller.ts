import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createAcademicFacultyService, getAllFacultiesService, getSingleFacultyService, updateFacultyService } from "./academicFaculty.service";

const createAcademicFaculty = catchAsync(async(req, res)=>{
    const result = await createAcademicFacultyService(req.body);
    sendResponse(res, {
        statusCode: 201,
        status: true,
        message: 'Academic Faculty is created successfully',
        data: result,
     })
})


const getAllFaculties = catchAsync( async (req, res) => {
    const result = await getAllFacultiesService();
    sendResponse(res, {
        statusCode: 200,
        status: true,
        message: 'Academic Faculties are retrieved successfully',
        data: result,
     })
});




const getSingleFaculty = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await getSingleFacultyService(id);
    sendResponse(res, {
        statusCode: 200,
        status: true,
        message: 'Single Academic Faculty is retrieved successfully',
        data: result,
     })
});


const updateFaculty = catchAsync( async (req, res) =>{
    const {id} = req.params;
    const result = await updateFacultyService(id, req.body);

    sendResponse(res, {
        statusCode: 200,
        status: true,
        message: 'Academic Faculty is updated successfully',
        data: result,
     })
});



export {
    createAcademicFaculty,
    getAllFaculties,
    getSingleFaculty,
    updateFaculty
}