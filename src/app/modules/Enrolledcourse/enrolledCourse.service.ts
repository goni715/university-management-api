import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import OfferedCourseModel from "../OfferedCourse/offeredCourse.model";
import { TEnrolledCourse } from "./enrolledCourse.interface";
import StudentModel from "../student/student.model";
import EnrolledCourseModel from "./enrolledCourse.model";


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
    

    return null;
};



export {
    createEnrolledCourseService
}

