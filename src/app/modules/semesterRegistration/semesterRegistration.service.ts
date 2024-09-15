import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import AcademicSemesterModel from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import SemesterRegistrationModel from "./semesterRegistration.model";


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
  




export {
    createSemesterRegistrationService
}