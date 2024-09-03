import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import UserModel from "./user.model";


const findLastStudentId = async()=>{
    const lastStudent = await UserModel.findOne({role: 'student'}, {id:1, _id:0}).sort({ createdAt: -1 }).lean();

    //202401 0001
    return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
}


export const generateStudentId = async(admissionSemester: TAcademicSemester) =>{

    const {name, code, year} = admissionSemester;

    //first time 0000
    const currentId = await findLastStudentId() || (0).toString();
    let incrementId = (Number(currentId) +1 ).toString().padStart(4,'0');

    incrementId = `${year}${code}${incrementId}`;
    console.log(incrementId);

    return incrementId;
}