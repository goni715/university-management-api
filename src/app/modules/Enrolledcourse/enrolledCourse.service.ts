import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import OfferedCourseModel from "../OfferedCourse/offeredCourse.model";
import { TCourseMarks, TEnrolledCourse } from "./enrolledCourse.interface";
import StudentModel from "../student/student.model";
import EnrolledCourseModel from "./enrolledCourse.model";
import mongoose from "mongoose";
import SemesterRegistrationModel from "../semesterRegistration/semesterRegistration.model";
import CourseModel from "../Course/course.model";
import FacultyModel from "../faculty/faculty.model";
import { calculateGradeAndPoints } from "./enrolledCourse.utils";
import QueryBuilder from "../../builder/Querybuilder";


const createEnrolledCourseService = async (userId:string, payload: Pick<TEnrolledCourse, 'offeredCourse'>) => {
    /**
     * Step1: Check if the offered course is exists
     * Step2: Check if the student is already enrolled
     * Step3: Check if the max credits exceed
     * Step4: Create an enrolled course
    **/
    
    const { offeredCourse } = payload;
    const isOfferedCourseExists = await OfferedCourseModel.findById(offeredCourse);
    if(!isOfferedCourseExists){
        throw new AppError(httpStatus.NOT_FOUND, `Offered course not found`)
    }


    //check if maxCapacity is 0
    if (isOfferedCourseExists.maxCapacity <= 0) {
        throw new AppError(httpStatus.BAD_GATEWAY, 'Room is full !');
    }
    


    const student = await StudentModel.findOne({id: userId}, {_id: 1});
    if(!student){
        throw new AppError(httpStatus.NOT_FOUND, `Student not found`)
    }


    const isStudentAlreadyEnrolled = await EnrolledCourseModel.findOne({
        semesterRegistration: isOfferedCourseExists?.semesterRegistration,
        offeredCourse,
        student: student?._id
    })

    if(isStudentAlreadyEnrolled){
        throw new AppError(httpStatus.CONFLICT, `Student is already enrolled !`)
    }
    

    //destructuring isOfferedCourseExists
    const { semesterRegistration, academicSemester, academicFaculty, academicDepartment, faculty, course } = isOfferedCourseExists;

   // check total credits exceeds maxCredit
   const courseData = await CourseModel.findById(course);
   const currentCredit = courseData?.credits;

   const semesterRegistrationData = await SemesterRegistrationModel.findById(semesterRegistration).select('maxCredit');
   const maxCredit = semesterRegistrationData?.maxCredit;

   //calculate total enrolled courses credits
   const enrolledCourses = await EnrolledCourseModel.aggregate([
    {
        $match: { semesterRegistration, student: student._id }
    },
    {
        $lookup : {
            from: 'courses',
            localField: 'course',
            foreignField: '_id',
            as: 'enrolledCourseData'
        }
    },
    {
        $unwind: '$enrolledCourseData'
    },
    {
        $group: {
            _id: null,
            totalEnrolledCredits: { $sum: '$enrolledCourseData.credits'}
        }
    },
    {
        $project : {
            _id:0,
            totalEnrolledCredits:1
        }
    }
   ])


    // total enrolled credits + new enrolled course credit > maxCredith
    const totalCredits = enrolledCourses.length > 0 ? enrolledCourses[0]?.totalEnrolledCredits : 0;
    
    if(totalCredits && maxCredit && totalCredits+currentCredit > maxCredit){
        throw new AppError(httpStatus.BAD_REQUEST, 'You have exceeded maximum number of credits !',)
    }



    const session = await mongoose.startSession();
    try{

        session.startTransaction();

        const result = await EnrolledCourseModel.create([{
            semesterRegistration,
            academicSemester,
            academicFaculty,
            academicDepartment,
            offeredCourse,
            course,
            student: student._id,
            faculty,
            isEnrolled: true
        }], {session})
    
        if(!result){
            throw new AppError(httpStatus.BAD_REQUEST, `Failled to enrolled in course !`)
        }

        //update maxCapacity- reduce maxCapacity
        const maxCapacity = isOfferedCourseExists.maxCapacity;
        await OfferedCourseModel.findByIdAndUpdate(offeredCourse, {
          maxCapacity: maxCapacity - 1,
        }, {session});

       await session.commitTransaction();
       await session.endSession();

       return result;

    }catch(err:any){
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err)
    }

};


const updateEnrolledCourseMarksService = async (facultyId: string, payload: Partial<TEnrolledCourse>) => {
    const { semesterRegistration, offeredCourse, student, courseMarks } = payload;

    const isSemesterRegistrationExists = await SemesterRegistrationModel.findById(semesterRegistration);
    if(!isSemesterRegistrationExists){
        throw new AppError(httpStatus.NOT_FOUND, `Semester Registration not found !`)
    }

    const isOfferedCourseExists = await OfferedCourseModel.findById(offeredCourse);
    if(!isOfferedCourseExists){
        throw new AppError(httpStatus.NOT_FOUND, `Offered course not found !`)
    }

    const isStudentExists = await StudentModel.findById(student);
    if(!isStudentExists){
        throw new AppError(httpStatus.NOT_FOUND, `Student not found !`)
    }

    const faculty = await FacultyModel.findOne({ id: facultyId}, {_id:1});
    if(!faculty){
        throw new AppError(httpStatus.NOT_FOUND, `Faculty not found !`)
    }

    const isCourseBelongToFaculty = await EnrolledCourseModel.findOne({
        semesterRegistration,
        offeredCourse,
        student,
        faculty: faculty?._id
    })

    if(!isCourseBelongToFaculty){
        throw new AppError(httpStatus.FORBIDDEN, `You are forbidden !`)
    }

   
    //dynamically update course marks
    const modifiedData : Record<string, unknown> = {}

   

    if(courseMarks && Object.keys(courseMarks).length){
        for (const [key, value] of Object.entries(courseMarks)){
            modifiedData[`courseMarks.${key}`] =value
        }
    }

    // console.log(modifiedData);
    // const outputModifiedData = {
    //     'courseMarks.classTest1': 3,
    //     'courseMarks.midTerm': 6,
    //     'courseMarks.classTest2': 9,
    //     'courseMarks.finalTerm': 9
    // }

    const session = await mongoose.startSession()

   try{
    session.startTransaction();

    const courseMarksUpdateResult = await EnrolledCourseModel.findByIdAndUpdate(isCourseBelongToFaculty._id,
        modifiedData,
        {
            new:true,
            session
        }
    )

    

    if(courseMarks?.finalTerm){
        const { classTest1, classTest2, midTerm, finalTerm } = courseMarksUpdateResult?.courseMarks as TCourseMarks;
        const toTalMarks = Number(classTest1 + classTest2 + midTerm + finalTerm);
        const {grade, gradePoints} = calculateGradeAndPoints(toTalMarks);
       
        //update grade & gradePoints
        await EnrolledCourseModel.findByIdAndUpdate(isCourseBelongToFaculty._id,
           {grade, gradePoints: gradePoints.toFixed(2), isCompleted:true },
            {
                new:true,
                session
            }
        )  
    }

    await session.commitTransaction();
    await session.endSession();
    return null;
    
   }catch(err:any){
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err)
   }
}


const getAllEnrolledCoursesOfFacultyService = async (
    facultyId: string,
    query: Record<string, unknown>,
  ) => {
    const faculty = await FacultyModel.findOne({ id: facultyId });
  
    if (!faculty) {
      throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found !');
    }
  
    const enrolledCourseQuery = new QueryBuilder(
      EnrolledCourseModel.find({
        faculty: faculty._id,
      }).populate(
        'semesterRegistration academicSemester academicFaculty academicDepartment offeredCourse course student faculty',
      ),
      query,
    )
      .filter()
      .sort()
      .paginate()
      .fields();
  
    const result = await enrolledCourseQuery.modelQuery;
    const meta = await enrolledCourseQuery.countTotal();
  
    return {
      meta,
      result,
    };
  };


 
const getMyEnrolledCoursesService = async (
    studentId: string,
    query: Record<string, unknown>,
  ) => {
    const student = await StudentModel.findOne({ id: studentId });
  
    if (!student) {
      throw new AppError(httpStatus.NOT_FOUND, 'Student not found !');
    }
  
    const enrolledCourseQuery = new QueryBuilder(
      EnrolledCourseModel.find({ student: student._id }).populate(
        'semesterRegistration academicSemester academicFaculty academicDepartment offeredCourse course student faculty',
      ),
      query,
    )
      .filter()
      .sort()
      .paginate()
      .fields();
  
    const result = await enrolledCourseQuery.modelQuery;
    const meta = await enrolledCourseQuery.countTotal();
  
    return {
      meta,
      result,
    };
  };
  







export {
    createEnrolledCourseService,
    updateEnrolledCourseMarksService,
    getAllEnrolledCoursesOfFacultyService,
    getMyEnrolledCoursesService
}

