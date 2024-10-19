import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createAcademicFacultyService, getAllAcademicFacultiesService, getSingleAcademicFacultyService, updateAcademicFacultyService} from "./academicFaculty.service";

const createAcademicFaculty = catchAsync(async(req, res)=>{
    const result = await createAcademicFacultyService(req.body);
    sendResponse(res, {
        statusCode: 201,
        status: true,
        message: 'Academic Faculty is created successfully',
        data: result,
     })
})


const getAllAcademicFaculties = catchAsync( async (req, res) => {
    const result = await getAllAcademicFacultiesService(req.query);
    sendResponse(res, {
        statusCode: 200,
        status: true,
        message: 'Academic Faculties are retrieved successfully',
        meta: result.meta,
        data: result.result,
     })
});




const getSingleAcademicFaculty = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await getSingleAcademicFacultyService(id);
    sendResponse(res, {
        statusCode: 200,
        status: true,
        message: 'Academic Faculty is retrieved successfully',
        data: result,
     })
});


const updateAcademicFaculty = catchAsync( async (req, res) =>{
    const {id} = req.params;
    const result = await updateAcademicFacultyService(id, req.body);

    sendResponse(res, {
        statusCode: 200,
        status: true,
        message: 'Academic Faculty is updated successfully',
        data: result
     })
});



export {
    createAcademicFaculty,
    getAllAcademicFaculties,
    getSingleAcademicFaculty,
    updateAcademicFaculty
}