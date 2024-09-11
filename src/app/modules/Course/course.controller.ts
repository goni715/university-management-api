import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createCourseService, deleteCourseService, getAllCoursesService, getSingleCourseService } from "./course.service";

const createCourse = catchAsync(async(req, res)=>{
    const result = await createCourseService(req.body);
    sendResponse(res, {
        statusCode: 201,
        status: true,
        message: 'Course is created successfully',
        data: result,
     })
})


const getAllCourses = catchAsync( async (req, res) => {
    const result = await getAllCoursesService();
    sendResponse(res, {
        statusCode: 200,
        status: true,
        message: 'Courses are retrieved successfully',
        data: result,
     })
});




const getSingleCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await getSingleCourseService(id);
    sendResponse(res, {
        statusCode: 200,
        status: true,
        message: 'Course is retrieved successfully',
        data: result,
     })
});


// const updateDepartment = catchAsync( async (req, res) =>{
//     const {id} = req.params;
//     const result = await updateDepartmentService(id, req.body);

//     sendResponse(res, {
//         statusCode: 200,
//         status: true,
//         message: 'Academic Department is updated successfully',
//         data: result,
//      })
// });

const deleteCourse = catchAsync( async (req, res) =>{
    const {id} = req.params;
    const result = await deleteCourseService(id);

    sendResponse(res, {
        statusCode: 200,
        status: true,
        message: 'Course is deleted successfully',
        data: result,
     })
});



export {
    createCourse,
    getAllCourses,
    getSingleCourse,
    deleteCourse
}