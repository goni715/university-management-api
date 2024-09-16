import { model, Schema } from "mongoose";
import { TOfferedCourse } from "./offeredCourse.interface";
import { Days } from "./offeredCourse.constant";


const offeredCourseSchema = new Schema<TOfferedCourse>({
    semesterRegistration: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'SemesterRegistration'
    },
    academicSemester: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'AcademicSemester'
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'AcademicFaculty'
    },
    academicDepartment: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'AcademicDepartment'
    },
    course: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Course'
    },
    faculty: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Faculty'
    },
    maxCapacity: {
        type: Number,
        required: true,
    },
    section: {
        type: Number,
        required: true,
    },
    days: [
        {
            type: String,
            enum: Days,
        }
    ],
    startTime: {
        type: String,
        required: true,
        validate: {
            validator: (value: string) => {
                const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
                return regex.test(value); //return true or false
            },
            message: 'Invalid time format , expected "HH:MM" in 24 hours format',
        }
    },
    endTime: {
        type: String,
        required: true,
        validate: {
            validator: function(value: string) {
                const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
                console.log(this.startTime);
                return regex.test(value); //return true or false
            },
            message: 'Invalid time format , expected "HH:MM" in 24 hours format',
        }
    }
},
{
    timestamps: true
});



// Custom validation function to compare startTime and endTime
offeredCourseSchema.path('endTime').validate(function (value) {
    // Assuming time is in HH:MM format
    const start = new Date(`2024-01-01T${this.startTime}:00`);
    const end = new Date(`2024-01-01T${value}:00`);
  
    // Validate that endTime is after startTime
    return end > start;
  }, 'Start time should be before End time!');
  




const OfferedCourseModel = model<TOfferedCourse>('OfferedCourse', offeredCourseSchema);
export default OfferedCourseModel;