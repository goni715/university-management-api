import { model, Schema } from "mongoose";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { Status } from "./semesterRegistration.constant";


const semesterRegistrationSchema = new Schema<TSemesterRegistration>({
    academicSemester: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'AcademicSemester'
    },
    status: {
        type: String,
        enum: {
          values: Status,
          message: '{VALUE} is not supported',
        },
        required: true,
    },
    startDate: {
        type: Date,
        required: [true, 'start date is required']
    },
    endDate: {
        type: Date,
        required: [true, 'end date is required']
    },
    minCredit: {
        type: Number,
        trim: true,
        required: [true, 'min credit is required'] 
    },
    maxCredit: {
        type: Number,
        trim: true,
        required: [true, 'max credit is required'] 
    }
});


const SemesterRegistrationModel = model<TSemesterRegistration>('SemesterRegistration', semesterRegistrationSchema);

export default SemesterRegistrationModel;