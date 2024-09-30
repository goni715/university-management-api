import { RequestHandler } from 'express';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { deleteAdminService, getAllAdminsService, getSingleAdminService, updateAdminService } from './admin.service';



const getAllAdmins = catchAsync( async (req, res) => {
  const query = req?.query;

    const result = await getAllAdminsService(query);
    res.status(200).json({
      status: true,
      message: 'Admins are retrieved successfully',
      meta: result.meta,
      data: result.result
    });
});




const getSingleAdmin = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await getSingleAdminService(id);
    res.status(200).json({
      status: true,
      message: 'Admin is retrieved successfully',
      data: result,
    });
});


const updateAdmin = catchAsync( async (req, res) =>{
  const {id} = req.params;
  const result = await updateAdminService(id, req.body);

  sendResponse(res, {
      statusCode: 200,
      status: true,
      message: 'Admin is updated successfully',
      data: result,
   })
});



const deleteAdmin : RequestHandler = async (req, res, next) => {
   try{
    const { id } = req.params;
    const result = await deleteAdminService(id);
    res.status(200).json({
      status: true,
      message: 'Admin is deleted successfully',
      data: result,
    });

   }catch(err){
     next(err)
   }
};

export {getAllAdmins, getSingleAdmin, updateAdmin, deleteAdmin };
