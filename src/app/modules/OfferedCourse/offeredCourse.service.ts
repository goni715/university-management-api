import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import SemesterRegistrationModel from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./offeredCourse.interface";
import OfferedCourseModel from "./offeredCourse.model";
import AcademicFacultyModel from "../academicFaculty/academicFaculty.model";
import AcademicDepartmentModel from "../academicDepartment/academicDepartment.model";
import CourseModel from "../Course/course.model";
import FacultyModel from "../faculty/faculty.model";
import { hasTimeConflict } from "./OfferedCourse.utils";
import QueryBuilder from "../../builder/Querybuilder";
import { Types } from "mongoose";
import StudentModel from "../student/student.model";


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
  const meta = await offeredCourseQuery.countTotal();

  return {
    meta,
    result,
  };
};




const getMyOfferedCoursesService = async (userId : string, query: Record<string, unknowny>) => {
 
  //find the student
  const student = await StudentModel.findOne({id:userId});
  if(!student){
    throw new AppError(httpStatus.NOT_FOUND, `Student not found`);
  }

    //find current ongoing semester
    const currentOngoingRegistrationSemester = await SemesterRegistrationModel.findOne(
      {
        status: 'ONGOING',
      },
    );
  
    if (!currentOngoingRegistrationSemester) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'There is no ongoing semester registration!',
      );
    }



    //pagination setup
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;


  const aggregationQuery = [
    {
      $match: {
        semesterRegistration: currentOngoingRegistrationSemester._id,
        academicFaculty: student.academicFaculty,
        academicDepartment: student.academicDepartment
      }
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as:'course'
      }
    },
    {
      $unwind: '$course'
    },
    {
      $lookup : {
        from: 'enrolledcourses',
        let: {
          currentOngoingRegistrationSemester:
            currentOngoingRegistrationSemester._id,
          currentStudent: student._id,
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and : [
                  {
                    $eq: ['$semesterRegistration', '$$currentOngoingRegistrationSemester']
                  },
                  {
                    $eq: ['$student', '$$currentStudent']
                  },
                  {
                    $eq: ['$isEnrolled', true],
                  },
                ]
              }
            }
          }
        ],
        as: 'enrolledCourses'
      }
    },
    {
      $lookup : {
        from: 'enrolledcourses',
        let: {
          currentStudent: student._id,
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and : [
                  {
                    $eq : ['$student', '$$currentStudent']
                  },
                  {
                    $eq : ['$isCompleted', true]
                  }
                ]
              }
            }
          }
        ],
        as: 'completedCourses'
      }
    },
    {
      $addFields: {
        completedCourseIds : {
          $map : {
            input: '$completedCourses',
            as: 'completed', //item
            in: '$$completed.course'
          }
        },
      }
    },
    {
      $addFields: {
        isAlreadyEnrolled: {
          $in: [ '$course._id',{
            $map: {
              input: '$enrolledCourses',
              as: 'enroll', // item
              in: '$$enroll.course'
            }
          }
          ]
        },
        isPreRequisiteFulfilled : {
          $or: [
            { $eq: ['$course.preRequisiteCourses', []] },
            {
              $setIsSubset: [
                '$course.preRequisiteCourses.course',
                '$completedCourseIds',
              ],
            },
          ],
        }
      }
    },
    {
      $match: {
        isAlreadyEnrolled: false,
        isPreRequisiteFulfilled: true
      }
    },
  ]

  const paginationQuery = [
    {
      $skip: skip
    },
    {
      $limit: limit
    }
  ]


  
  const result = await OfferedCourseModel.aggregate([
    ...aggregationQuery,
    ...paginationQuery
  ])


  const total = (await OfferedCourseModel.aggregate(aggregationQuery)).length;
  const totalPage = Math.ceil(result.length /limit)





  return {
    meta: {
      page,
      limit,
      total,
      totalPage
    },
    result
  }

};




const getSingleOfferedCourseService = async (id: string) => {
  const ObjectId = Types.ObjectId;
  const result = await OfferedCourseModel.findOne({ _id: new ObjectId(id) });
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
    getMyOfferedCoursesService,
    getSingleOfferedCourseService,
    updateOfferdCourseService
}