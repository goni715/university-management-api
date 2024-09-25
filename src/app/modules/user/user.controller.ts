import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";


const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const {password, studentData} = req.body;
     
       const result = await UserServices.createStudentService(password, studentData);
  
      // res.status(201).json({
      //   status: true,
      //   message: 'Student is created successfully',
      //   data: result,
      //   });

      sendResponse(res, {
         statusCode: 201,
         status: true,
         message: 'Student is created successfully',
         data: result,
      })

    } catch (err:any) {
      next(err);
    }
  };




  const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const {password, adminData} = req.body;
     
       const result = await UserServices.createAdminService(password, adminData);

      sendResponse(res, {
         statusCode: 201,
         status: true,
         message: 'Admin is created successfully',
         data: result,
      })

    } catch (err:any) {
      next(err);
    }
  };


  
  const createFaculty = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const {password, facultyData} = req.body;
     
       const result = await UserServices.createFacultyService(password, facultyData);

      sendResponse(res, {
         statusCode: 201,
         status: true,
         message: 'Faculty is created successfully',
         data: result,
      })

    } catch (err:any) {
      next(err);
    }
  };


  const getAllUsers = catchAsync( async (req, res) => {
     
      const result = await UserServices.getAllUsersService();
      res.status(200).json({
        status: true,
        message: 'Users are retrieved successfully',
        data: result,
      });
  });
  
  
  
  
  const getSingleUser = catchAsync(async (req, res) => {
      const { id } = req.params;
      const result = await UserServices.getSingleUserService(id);
      res.status(200).json({
        status: true,
        message: 'User is retrieved successfully',
        data: result,
      });
  });


  
const getMe = catchAsync(async (req, res) => {
    const { userId, role } = req.user;
    const result = await UserServices.getMeService(userId, role);
    res.status(200).json({
      status: true,
      message: 'User is retrieved successfully',
      data: result
    });
});



const changeStatus = catchAsync(async (req, res) => {
  const {id} = req.params;
  const result = await UserServices.changeStatusService(id, req.body);
  res.status(200).json({
    status: true,
    message: 'Status is updated successfully',
    data: result
  });
});


  export {
    createStudent,
    createAdmin,
    createFaculty,
    getAllUsers,
    getSingleUser,
    getMe,
    changeStatus
  }