import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createOfferedCourseService, getAllOfferedCoursesService, getMyOfferedCoursesService, getSingleOfferedCourseService, updateOfferdCourseService } from "./offeredCourse.service";


const createOfferedCourse = catchAsync(async(req, res)=>{
    const result = await createOfferedCourseService(req.body);
    sendResponse(res, {
        statusCode: 201,
        status: true,
        message: 'Offered Course is created successfully',
        data: result,
     })
});


const getAllOfferedCourses = catchAsync( async (req, res) => {
    const query = req?.query;
  
      const result = await getAllOfferedCoursesService(query);
      res.status(200).json({
        status: true,
        message: 'Offered Courses are retrieved successfully',
        data: result,
      });
  });


  
const getMyOfferedCourses = catchAsync( async (req, res) => {
  const userId = req.user.userId;

    const result = await getMyOfferedCoursesService(userId);
    res.status(200).json({
      status: true,
      message: 'My Offered Courses are retrieved successfully',
      data: result,
    });
});

  
const getSingleOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await getSingleOfferedCourseService(id);
  res.status(200).json({
    status: true,
    message: 'Offered Course is retrieved successfully',
    data: result,
  });
});


const updateOfferedCourse = catchAsync( async (req, res) =>{
    const {id} = req.params;
    const result = await updateOfferdCourseService(id, req.body);

    sendResponse(res, {
        statusCode: 200,
        status: true,
        message: 'Offered Course is updated successfully',
        data: result,
     })
});


export {
    createOfferedCourse,
    getAllOfferedCourses,
    getMyOfferedCourses,
    getSingleOfferedCourse,
    updateOfferedCourse
}
