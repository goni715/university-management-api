import { model, Schema } from "mongoose";
import { TCourseMarks, TEnrolledCourse } from "./enrolledCourse.interface";
import { Grade } from "./enrolledCourse.constant";


const courseMarksSchema = new Schema<TCourseMarks>({
    classTest1: {
      type: Number,
      trim: true,
      min:0,
      max: 10,
      default: 0
    },
    midTerm: {
        type: Number,
        trim: true,
        min:0,
        max: 30,
        default: 0
    },
    classTest2: {
        type: Number,
        trim: true,
        min:0,
        max: 10,
        default: 0
    },
    finalTerm: {
        type: Number,
        trim: true,
        min:0,
        max: 50,
        default: 0
    },
},
{ _id: false}
);



const enrolledCourseSchema = new Schema<TEnrolledCourse>({
    semesterRegistration: {
        type: Schema.Types.ObjectId,
        required:true,
        ref: 'SemesterRegistration'
    },
    academicSemester: {
        type: Schema.Types.ObjectId,
        required:true,
        ref: 'AcademicSemester'
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        required:true,
        ref: 'AcademicFaculty'
    },
    academicDepartment: {
        type: Schema.Types.ObjectId,
        required:true,
        ref: 'AcademicDepartment'
    },
    offeredCourse: {
        type: Schema.Types.ObjectId,
        required:true,
        ref: 'SemesterRegistration'
    },
    course: {
        type: Schema.Types.ObjectId,
        required:true,
        ref: 'Course'
    },
    student: {
        type: Schema.Types.ObjectId,
        required:true,
        ref: 'students'
    },
    faculty: {
        type: Schema.Types.ObjectId,
        required:true,
        ref: 'Faculty'
    },
    isEnrolled: {
        type: Boolean,
        default: false
    },
    courseMarks: {
        type: courseMarksSchema,
        default: {}
    },
    grade: {
        type: String,
        enum: Grade,
        default: 'NA'
    },
    gradePoints: {
        type: Number,
        min: 0,
        max: 4,
        default: 0
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
})



const EnrolledCourseModel = model<TEnrolledCourse>('EnrolledCourse', enrolledCourseSchema);
export default EnrolledCourseModel;