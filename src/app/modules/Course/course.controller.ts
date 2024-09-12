import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { assignCourseFacultiesService, createCourseService, deleteCourseService, getAllCourseFacultiesService, getAllCoursesService, getSingleCourseService, removeFacultiesFromCourseService, updateCourseService } from "./course.service";

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
    const result = await getAllCoursesService(req.query);
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


const updateCourse = catchAsync( async (req, res) =>{
    const {id} = req.params;
    const result = await updateCourseService(id, req.body);

    sendResponse(res, {
        statusCode: 200,
        status: true,
        message: 'Course is updated successfully',
        data: result,
     })
});

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


const assignCourseFaculties = catchAsync( async (req, res) =>{
    const {courseId} = req.params;
    const {faculties} = req.body;
    const result = await assignCourseFacultiesService(courseId, faculties);

    sendResponse(res, {
        statusCode: 200,
        status: true,
        message: 'Faculties assigned successfully',
        data: result,
     })
});



const removeFacultiesFromCourse = catchAsync( async (req, res) =>{
    const {courseId} = req.params;
    const {faculties} = req.body;
    const result = await removeFacultiesFromCourseService(courseId, faculties);

    sendResponse(res, {
        statusCode: 200,
        status: true,
        message: 'Faculties removed successfully',
        data: result,
     })
});

const getAllCourseFaculties = catchAsync( async (req, res) => {
    const result = await getAllCourseFacultiesService();
    sendResponse(res, {
        statusCode: 200,
        status: true,
        message: 'Course Faculties are retrieved successfully',
        data: result,
     })
});



export {
    createCourse,
    getAllCourses,
    getSingleCourse,
    updateCourse,
    deleteCourse,
    assignCourseFaculties,
    removeFacultiesFromCourse,
    getAllCourseFaculties
}