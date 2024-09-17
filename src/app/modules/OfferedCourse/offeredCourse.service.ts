import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import SemesterRegistrationModel from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./offeredCourse.interface";
import OfferedCourseModel from "./offeredCourse.model";
import AcademicFacultyModel from "../academicFaculty/academicFaculty.model";
import AcademicDepartmentModel from "../academicDepartment/academicDepartment.model";
import CourseModel from "../Course/course.model";
import FacultyModel from "../faculty/faculty.model";


const createOfferedCourseService = async (PostBody: TOfferedCourse) => {
    const {semesterRegistration,academicFaculty, academicDepartment, course, faculty, section} = PostBody;

    //check if the semester registration id is exists!
    const isSemesterRegistrationExits = await SemesterRegistrationModel.findById(semesterRegistration);
    if (!isSemesterRegistrationExits) {
      throw new AppError(
       httpStatus.NOT_FOUND,
         'Semester registration not found !',
      );
    }

    //academicSemester id
    const academicSemester = isSemesterRegistrationExits.academicSemester;

    //check if the academicFaculty id is exists!
    const isAcademicFacultyExits = await AcademicFacultyModel.findById(academicFaculty);
    if (!isAcademicFacultyExits) {
      throw new AppError(
       httpStatus.NOT_FOUND,
         'Academic Faculty not found !',
      );
    }


     //check if the academicDepartment id is exists!
     const isAcademicDepartmentExits = await AcademicDepartmentModel.findById(academicDepartment);
     if (!isAcademicDepartmentExits) {
       throw new AppError(
        httpStatus.NOT_FOUND,
          'Academic Department not found !',
       );
     }



     //check if the course id is exists!
     const isCourseExits = await CourseModel.findById(course);
     if (!isCourseExits) {
       throw new AppError(
        httpStatus.NOT_FOUND,
          'Course not found !',
       );
     }


      //check if the faculty id is exists!
      const isFacultyExits = await FacultyModel.findById(faculty);
      if (!isFacultyExits) {
        throw new AppError(
         httpStatus.NOT_FOUND,
           'Faculty not found !',
        );
      }


      // check if the academicDepartment is belong to the academicFaculty
      const isDepartmentToBelongToAcademicFaculty = await AcademicDepartmentModel.findOne({
        _id: academicDepartment,
        academicFaculty
      })

      if(!isDepartmentToBelongToAcademicFaculty){
        throw new AppError(httpStatus.BAD_REQUEST, `This ${isAcademicDepartmentExits.name} is not belong to the ${isAcademicFacultyExits.name}`)
      }


      // check if the same offeredCourse, same section, in same registered semester exists
      const isSameOfferedCourseExistWithSameRegisteredSemesterWithSameSection = await OfferedCourseModel.findOne({
        semesterRegistration,
        course,
        section
      });

      if(isSameOfferedCourseExistWithSameRegisteredSemesterWithSameSection){
        throw new AppError(httpStatus.BAD_REQUEST, `Offered course with same section is already exist`)
      }



    const result = await OfferedCourseModel.create({
        ...PostBody,
        academicSemester
    }); 
    return result;
};





export {
    createOfferedCourseService
}