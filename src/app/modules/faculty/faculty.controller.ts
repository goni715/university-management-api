import { RequestHandler} from 'express';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { deleteFacultyService, getAllFacultiesService, getSingleFacultyService, updateFacultyService } from './faculty.service';



const getAllFaculties = catchAsync( async (req, res) => {
  const query = req?.query;

    const result = await getAllFacultiesService(query);
    res.status(200).json({
      status: true,
      message: 'Faculties are retrieved successfully',
      data: result,
    });
});




const getSingleFaculty = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await getSingleFacultyService(id);
    res.status(200).json({
      status: true,
      message: 'Faculty is retrieved successfully',
      data: result,
    });
});


const updateFaculty = catchAsync( async (req, res) =>{
  const {id} = req.params;
  const result = await updateFacultyService(id, req.body);

  sendResponse(res, {
      statusCode: 200,
      status: true,
      message: 'Faculty is updated successfully',
      data: result,
   })
});



const deleteFaculty : RequestHandler = async (req, res, next) => {
   try{
    const { id } = req.params;
    const result = await deleteFacultyService(id);
    res.status(200).json({
      status: true,
      message: 'Faculty is deleted successfully',
      data: result,
    });

   }catch(err){
     next(err)
   }
};

export {getAllFaculties, getSingleFaculty, updateFaculty, deleteFaculty };
