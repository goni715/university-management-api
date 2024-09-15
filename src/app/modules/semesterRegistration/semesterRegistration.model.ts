import { model, Schema } from "mongoose";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistrationStatus } from "./semesterRegistration.constant";


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
          values: SemesterRegistrationStatus,
          message: '{VALUE} is not supported',
        },
        default: 'UPCOMING',
    },
    startDate: {
        type: Date,
        required: [true, 'startDate is required']
    },
    endDate: {
        type: Date,
        required: [true, 'endDate is required']
    },
    minCredit: {
        type: Number,
        trim: true,
        default: 3
    },
    maxCredit: {
        type: Number,
        trim: true,
        default: 15
    }
}, {
    timestamps: true
});


const SemesterRegistrationModel = model<TSemesterRegistration>('SemesterRegistration', semesterRegistrationSchema);

export default SemesterRegistrationModel;