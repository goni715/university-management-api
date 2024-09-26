import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import OfferedCourseModel from "../OfferedCourse/offeredCourse.model";
import { TEnrolledCourse } from "./enrolledCourse.interface";
import StudentModel from "../student/student.model";
import EnrolledCourseModel from "./enrolledCourse.model";
import mongoose from "mongoose";


const createEnrolledCourseService = async (userId:string, payload: Pick<TEnrolledCourse, 'offeredCourse'>) => {
    /**
     * Step1: Check if the offered course is exists
     * Step2: Check if the student is already enrolled
     * Step3: Create an enrolled course
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
    


    const student = await StudentModel.findOne({id: userId}).select('id');
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
    

    const session = await mongoose.startSession();
    try{

        session.startTransaction();

        //destructuring isOfferedCourseExists
        const { semesterRegistration, academicSemester, academicFaculty, academicDepartment, faculty, course } = isOfferedCourseExists;


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



export {
    createEnrolledCourseService
}

