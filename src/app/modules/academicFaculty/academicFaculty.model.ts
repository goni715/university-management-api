import { model, Schema } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interface";



const academicFacultySchema = new Schema<TAcademicFaculty>({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
},{
    timestamps:true
})



const AcademicFacultyModel = model<TAcademicFaculty>('AcademicFaculty', academicFacultySchema);

export default AcademicFacultyModel;