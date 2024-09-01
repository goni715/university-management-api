import { Request, Response } from "express";
import userValidationSchema from "./user.validation";


const createStudent = async (req: Request, res: Response) => {
    try {

        const {password, studentData} = req.body;
     
      //data validation using zod
      //const zodParsedData = userValidationSchema.parse(req.body);
      //const result = await createStudentService(zodParsedData as TUser);
  
  
      res.status(201).json({
        status: true,
        message: 'Student is created successfully',
        //data: result,
        });
    } catch (error:any) {
      res.status(500).json({ status: false, message: error.message || 'Something weng wrong', error: error });
    }
  };