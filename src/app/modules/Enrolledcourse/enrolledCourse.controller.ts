import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createEnrolledCourseService, getAllEnrolledCoursesOfFacultyService, getMyEnrolledCoursesService, updateEnrolledCourseMarksService } from "./enrolledCourse.service";


const createEnrolledCourse = catchAsync(async(req, res)=>{
    const userId = req.user.userId;
    const result = await createEnrolledCourseService(userId, req.body);
    sendResponse(res, {
        statusCode: 201,
        status: true,
        message: 'Enrolled Course is created successfully',
        data: result,
     })
})


const updateEnrolledCourseMarks = catchAsync(async(req, res)=>{
    const userId = req.user.userId;
    const result = await updateEnrolledCourseMarksService(userId, req.body);
    sendResponse(res, {
        statusCode: 200,
        status: true,
        message: 'Enrolled Course Marks is updated successfully',
        data: result,
     })
})



const getAllEnrolledCoursesOfFaculty = catchAsync(async (req, res) => {
    const facultyId = req.user.userId;
  
    const result = await getAllEnrolledCoursesOfFacultyService(
      facultyId,
      req.query,
    );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      status: true,
      message: 'Enrolled courses are retrieved successfully',
      meta: result.meta,
      data: result.result,
    });
  });
  

  const getMyEnrolledCourses = catchAsync(async (req, res) => {
    const studentId = req.user.userId;
  
    const result = await getMyEnrolledCoursesService(
      studentId,
      req.query,
    );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      status:true,
      message: 'Enrolled courses are retrieved successfully',
      meta: result.meta,
      data: result.result,
    });
  });



export {
    createEnrolledCourse,
    updateEnrolledCourseMarks,
    getAllEnrolledCoursesOfFaculty,
    getMyEnrolledCourses
}