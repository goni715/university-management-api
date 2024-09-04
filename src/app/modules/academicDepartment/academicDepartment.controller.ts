import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createAcademicDepartmentService, getAllDepartmentsService, getSingleDepartmentService, updateDepartmentService } from "./academicDepartment.service";

const createAcademicDepartment = catchAsync(async(req, res)=>{
    const result = await createAcademicDepartmentService(req.body);
    sendResponse(res, {
        statusCode: 201,
        status: true,
        message: 'Academic Department is created successfully',
        data: result,
     })
})


const getAllDepartments = catchAsync( async (req, res) => {
    const result = await getAllDepartmentsService();
    sendResponse(res, {
        statusCode: 201,
        status: true,
        message: 'Academic Departments are retrieved successfully',
        data: result,
     })
});




const getSingleDepartment = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await getSingleDepartmentService(id);
    sendResponse(res, {
        statusCode: 201,
        status: true,
        message: 'Academic Department is retrieved successfully',
        data: result,
     })
});


const updateDepartment = catchAsync( async (req, res) =>{
    const {id} = req.params;
    const result = await updateDepartmentService(id, req.body);

    sendResponse(res, {
        statusCode: 200,
        status: true,
        message: 'Academic Department is updated successfully',
        data: result,
     })
});



export {
    createAcademicDepartment,
    getAllDepartments,
    getSingleDepartment,
    updateDepartment
}