import { Schema } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";



const academicSemesterSchema = new Schema<TAcademicSemester>({
    name: {
        type: String,
        enum: ['Autumn', 'Summer' , 'Fall']
    },
    code: {
        type: String,
        enum: ['01', '02' , '03']
    },
    year: {
        type: Date,
        required: true
    },
    startMonth: {
        type: String,
        enum : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    },
    endMonth: {
        type: String,
        enum : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }
})