import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { assignCourseFacultiesService, getAllCourseFacultiesService, removeFacultiesFromCourseService } from "./courseFaculty.service";

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
    assignCourseFaculties,
    removeFacultiesFromCourse,
    getAllCourseFaculties
}