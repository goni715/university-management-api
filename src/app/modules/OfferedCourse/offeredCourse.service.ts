import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import SemesterRegistrationModel from "../semesterRegistration/semesterRegistration.model";
import { TDays, TOfferedCourse, TSchedule } from "./offeredCourse.interface";
import OfferedCourseModel from "./offeredCourse.model";
import AcademicFacultyModel from "../academicFaculty/academicFaculty.model";
import AcademicDepartmentModel from "../academicDepartment/academicDepartment.model";
import CourseModel from "../Course/course.model";
import FacultyModel from "../faculty/faculty.model";
import { hasTimeConflict } from "./OfferedCourse.utils";
import QueryBuilder from "../../builder/Querybuilder";


const createOfferedCourseService = async (PostBody: TOfferedCourse) => {
    const {semesterRegistration,academicFaculty, academicDepartment, course, faculty, section, days, startTime, endTime} = PostBody;

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


      //get the schedules of the faculty
      const assignedSchedules = await OfferedCourseModel.find({
        semesterRegistration,
        faculty,
        days: {$in: days}
      }).select('days startTime endTime');

      const newSchedule = {
        days,
        startTime,
        endTime
      }


     const timeConfliction = hasTimeConflict(assignedSchedules, newSchedule); //true or false
     if(timeConfliction){
      throw new AppError(httpStatus.CONFLICT, `This faculty is not available at that time ! Choose other day or day`)
     }
     



    const result = await OfferedCourseModel.create({
        ...PostBody,
        academicSemester
    }); 
    return result;

};




const getAllOfferedCoursesService = async (query: Record<string, unknown>) => {
 
  const offeredCourseQuery = new QueryBuilder(
    OfferedCourseModel.find(),
    query,
  ).filter().sort().paginate().fields();


  const result = await offeredCourseQuery.modelQuery;
  return result;
};



const updateOfferdCourseService = async (id: string, updateData: Pick<TOfferedCourse, 'faculty'| 'days' | 'startTime' | 'endTime'>) => {

const {faculty, days, startTime, endTime} = updateData;

  //check if the Offered Course is exists!
  const isOfferedCourseExits = await OfferedCourseModel.findById(id);
  if (!isOfferedCourseExits) {
    throw new AppError(
     httpStatus.NOT_FOUND,
       'Offered Course is not found !',
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


  // semesterRegistration id
  const semesterRegistration = isOfferedCourseExits?.semesterRegistration;

  //get semesterRegisterRegistration data
  const semesterRegistrationData = await SemesterRegistrationModel.findById(semesterRegistration);
  if(semesterRegistrationData?.status !== 'UPCOMING'){
    throw new AppError(
      httpStatus.BAD_REQUEST,
        `You can not update this offered course as it is ${semesterRegistrationData?.status}`,
     );
  }

   //get the schedules of the faculty
   const assignedSchedules = await OfferedCourseModel.find({
    semesterRegistration,
    faculty,
    days: {$in: days}
  }).select('days startTime endTime');



  const newSchedule = {
    days,
    startTime,
    endTime
  }


 const timeConfliction = hasTimeConflict(assignedSchedules, newSchedule); //true or false
 if(timeConfliction){
  throw new AppError(httpStatus.CONFLICT, `This faculty is not available at that time ! Choose other day or day`)
 }


  //using findByIdAndUpdate()
  const result = await OfferedCourseModel.findByIdAndUpdate(
    id,
    updateData ,
    {new:true}
  )
  return result;


}



export {
    createOfferedCourseService,
    getAllOfferedCoursesService,
    updateOfferdCourseService
}