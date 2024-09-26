import { Types } from "mongoose";


export type TGrade = 'A+'| 'A' | 'A-' | 'B+' | 'B' | 'B-' | "C+" | 'C' | 'D' | 'F' | 'NA';

export type TCourseMarks = {
    classTest1: number;
    midTerm: number;
    classTest2: number;
    finalTerm: number;
}


export type TEnrolledCourse = {
    semesterRegistration: Types.ObjectId;
    academicSemester: Types.ObjectId;
    academicFaculty: Types.ObjectId;
    academicDepartment: Types.ObjectId;
    offeredCourse: Types.ObjectId;
    course: Types.ObjectId;
    student: Types.ObjectId;
    faculty: Types.ObjectId;
    isEnrolled: boolean;
    courseMarks: TCourseMarks;
    grade: TGrade,
    gradePoints: Types.Decimal128;
    isCompleted: boolean;
}