import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createSemesterRegistrationService, getAllSemesterRegistrationsService, getSingleSemesterRegistrationService, updateSemesterRegistrationService } from "./semesterRegistration.service";


const createSemesterRegistration = catchAsync(async(req, res, next) => {
    const result = await createSemesterRegistrationService(req.body)
    sendResponse(res, {
        statusCode: 201,
        status: true,
        message: 'Semester Registration is created successfully',
        data: result,
     })
});



const getAllSemesterRegistrations = catchAsync( async (req, res) => {
    const query = req?.query;
  
      const result = await getAllSemesterRegistrationsService(query);
      res.status(200).json({
        status: true,
        message: 'Semester Registrations are retrieved successfully',
        data: result,
      });
  });



  const getSingleSemesterRegistration = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await getSingleSemesterRegistrationService(id);
    res.status(200).json({
      status: true,
      message: 'Semester Registration is retrieved successfully',
      data: result,
    });
});


const updateSemesterRegistration = catchAsync( async (req, res) =>{
  const {id} = req.params;
  const result = await updateSemesterRegistrationService(id, req.body);

  sendResponse(res, {
      statusCode: 200,
      status: true,
      message: 'Semester Registration is updated successfully',
      data: result,
   })
});


export {
    createSemesterRegistration,
    getAllSemesterRegistrations,
    getSingleSemesterRegistration,
    updateSemesterRegistration,
}