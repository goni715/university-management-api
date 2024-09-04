import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";



const academicDepartmentSchema = new Schema<TAcademicDepartment>({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "AcademicFaculty"
    } 
},{
    timestamps:true
})



const AcademicDepartmentModel = model<TAcademicDepartment>('AcademicDepartment', academicDepartmentSchema);

export default AcademicDepartmentModel;