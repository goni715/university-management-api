import { NextFunction, Request, Response } from "express";
import userValidationSchema from "./user.validation";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";


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


  export {
    createStudent,
    createAdmin
  }