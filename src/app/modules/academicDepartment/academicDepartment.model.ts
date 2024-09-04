import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import AppError from "../../utils/AppError";



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


academicDepartmentSchema.pre('save', async function(next){
    const isDepartmentExist = await AcademicDepartmentModel.findOne({name: this.name});

    if(isDepartmentExist){
        throw new Error('This department is already existed');
    }

    next()
});





academicDepartmentSchema.pre('updateOne', async function(next){
    const query = this.getQuery() //update query-- { _id: new ObjectId('66d83cbcedb203d8296914f8') }
    const isDepartmentExist = await AcademicDepartmentModel.findOne(query);

    if(!isDepartmentExist){
        throw new AppError(404,'This department does not exist');
    }

    next()
});


const AcademicDepartmentModel = model<TAcademicDepartment>('AcademicDepartment', academicDepartmentSchema);

export default AcademicDepartmentModel;