import { Request, RequestHandler, Response, NextFunction } from 'express';
import {
  deleteStudentService,
  getAllStudentsService,
  getSingleStudentService,
  updateStudentService,
} from './student.service';
import sendResponse from '../../utils/sendResponse';



const catchAsync = (fn: RequestHandler)=>{
  return (req: Request, res:Response, next:NextFunction)=>{
    Promise.resolve(fn(req, res, next)).catch((err)=> next(err))
  }
}



const getAllStudents = catchAsync( async (req, res) => {
  const query = req.query;

    const result = await getAllStudentsService(query);
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


const updateStudent = catchAsync( async (req, res) =>{
  const {id} = req.params;
  const result = await updateStudentService(id, req.body);

  sendResponse(res, {
      statusCode: 200,
      status: true,
      message: 'Student is updated successfully',
      data: result,
   })
});



const deleteStudent : RequestHandler = async (req, res, next) => {
   try{
    const { id } = req.params;
    const result = await deleteStudentService(id);
    res.status(200).json({
      status: true,
      message: 'Student is deleted successfully',
      data: result,
    });

   }catch(err){
     next(err)
   }
};

export {getAllStudents, getSingleStudent, updateStudent, deleteStudent };
