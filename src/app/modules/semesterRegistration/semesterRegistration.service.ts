import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import AcademicSemesterModel from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import SemesterRegistrationModel from "./semesterRegistration.model";
import QueryBuilder from "../../builder/Querybuilder";
import { Types } from "mongoose";


const createSemesterRegistrationService = async (payload: TSemesterRegistration) => {

    const academicSemesterId = payload?.academicSemester;

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
  





export {
    createSemesterRegistrationService,
    getAllSemesterRegistrationsService,
    getSingleSemesterRegistrationService
}