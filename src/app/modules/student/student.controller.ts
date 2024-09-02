import { Request, RequestHandler, Response, NextFunction } from 'express';
import {
  deleteStudentService,
  getAllStudentsService,
  getSingleStudentService,
} from './student.service';



const catchAsync = (fn: RequestHandler)=>{
  return (req: Request, res:Response, next:NextFunction)=>{
    Promise.resolve(fn(req, res, next)).catch((err)=> next(err))
  }
}



const getAllStudents = catchAsync( async (req, res) => {
    const result = await getAllStudentsService();
    res.status(200).json({
      status: true,
      message: 'Students are retrieved successfully',
      data: result,
    });
});




const getSingleStudent = catchAsync(async (req, res) => {
    const { studentId } = req.params;
    const result = await getSingleStudentService(studentId);
    res.status(200).json({
      status: true,
      message: 'Single student is retrieved successfully',
      data: result,
    });
});



const deleteStudent : RequestHandler = async (req, res, next) => {
   try{
    const { studentId } = req.params;
    const result = await deleteStudentService(studentId);
    res.status(200).json({
      status: true,
      message: 'Single student is deleted successfully',
      data: result,
    });

   }catch(err){
     next(err)
   }
};

export {getAllStudents, getSingleStudent, deleteStudent };
