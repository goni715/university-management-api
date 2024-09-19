import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import AcademicSemesterModel from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import SemesterRegistrationModel from "./semesterRegistration.model";
import QueryBuilder from "../../builder/Querybuilder";
import mongoose, { Types } from "mongoose";
import { RegistrationStatus } from "./semesterRegistration.constant";
import OfferedCourseModel from "../OfferedCourse/offeredCourse.model";


const createSemesterRegistrationService = async (payload: TSemesterRegistration) => {

    const academicSemesterId = payload?.academicSemester;

    //check if there any registered semester that is already 'UPCOMING' / 'ONGOING
    const isThereAnyUpcomingOrOngoingSemester = await SemesterRegistrationModel.findOne({
      $or: [
        {status: RegistrationStatus.UPCOMING},
        {status: RegistrationStatus.ONGOING}
      ]
    })
    if(isThereAnyUpcomingOrOngoingSemester){
      throw new AppError(httpStatus.BAD_REQUEST, `There is already an ${isThereAnyUpcomingOrOngoingSemester.status} registered semester`)
    }

    // check if the academic semester is exist
    const academicSemesterExists = await AcademicSemesterModel.findById(academicSemesterId);
    if(!academicSemesterExists){
        throw new AppError(httpStatus.NOT_FOUND, 'This academic semester is not found')
    }

    // check if the semester is already registered
    const isSemesterRegistrationExists = await SemesterRegistrationModel.findOne({academicSemester: academicSemesterId});
    if(isSemesterRegistrationExists){
        throw new AppError(httpStatus.CONFLICT, 'This semester is already registered!')
    }

    const result = await SemesterRegistrationModel.create(payload); 
    return result;
  };
  



  const getAllSemesterRegistrationsService = async (query: Record<string, unknown>) => {
 
    const semesterRegistrationQuery = new QueryBuilder(
      SemesterRegistrationModel.find().populate('academicSemester'),
      query,
    ).filter().sort().paginate().fields();

  
    const result = await semesterRegistrationQuery.modelQuery;
    return result;
  };


  const getSingleSemesterRegistrationService = async (id: string) => {
    const ObjectId = Types.ObjectId;
    const result = await SemesterRegistrationModel.findOne({ _id: new ObjectId(id) }).populate('academicSemester');
    return result;
  };



const updateSemesterRegistrationService = async (id: string, updateData: Partial<TSemesterRegistration>) => {
  //check if the requested register semester is exists
  // check if the semester is already registered
  const isSemesterRegistrationExists = await SemesterRegistrationModel.findById(id);
  if(!isSemesterRegistrationExists){
    throw new AppError(httpStatus.NOT_FOUND, `This semester is not found !`)
  }
   

   //if the current semester registration is ended, will not update anything
   const currentSemesterStatus = isSemesterRegistrationExists?.status;
   const changingStatus = updateData?.status; 

   if(currentSemesterStatus === RegistrationStatus.ENDED){
    throw new AppError(httpStatus.BAD_REQUEST, `This semester is already ${currentSemesterStatus}`)
   }



   //sequence of status: UPCOMING ---> ONGOING ---> ENDED 
   if(currentSemesterStatus === RegistrationStatus.UPCOMING && changingStatus === RegistrationStatus.ENDED){
    throw new AppError(httpStatus.BAD_REQUEST, `You can not directly change status from ${currentSemesterStatus} to ${changingStatus}`)
   }

   if(currentSemesterStatus === RegistrationStatus.ONGOING && changingStatus === RegistrationStatus.UPCOMING){
    throw new AppError(httpStatus.BAD_REQUEST, `You can not directly change status from ${currentSemesterStatus} to ${changingStatus}`)
   }

   const result = await SemesterRegistrationModel.findByIdAndUpdate(id, 
    updateData,
    {
      new: true,
      runValidators: true
    });

  return result;
};
   
  

const deleteSemesterRegistrationService = async(id:string) => {
   // checking if the semester registration is exist
   const isSemesterRegistrationExists = await SemesterRegistrationModel.findById(id);

   if (!isSemesterRegistrationExists) {
     throw new AppError(
       httpStatus.NOT_FOUND,
       'This registered semester is not found !',
     );
   }

    // checking if the status is still "UPCOMING"
  const semesterRegistrationStatus = isSemesterRegistrationExists.status;

  if (semesterRegistrationStatus !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not delete as the registered semester is ${semesterRegistrationStatus}`,
    );
  }

  const session = await mongoose.startSession();

  try{
    session.startTransaction();

    //delete semester registration
    const deletedSemisterRegistration =
    await SemesterRegistrationModel.findByIdAndDelete(id, {
      session,
      new: true,
    });

  if (!deletedSemisterRegistration) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to delete semester registration !',
    );
  }


  //delete the offered courses associated with the semester Registration
  const deletedOfferedCourse = await OfferedCourseModel.deleteMany(
    { semesterRegistration: id},
    {session},
  );


  if (!deletedOfferedCourse) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to delete associated Offered Course !',
    );
  }

  
  await session.commitTransaction();
  await session.endSession();

  return deletedOfferedCourse


  }catch(err:any){
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err)
  }

}



export {
    createSemesterRegistrationService,
    getAllSemesterRegistrationsService,
    getSingleSemesterRegistrationService,
    updateSemesterRegistrationService,
    deleteSemesterRegistrationService
}