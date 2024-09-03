import { Types } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import AcademicSemesterModel from "./academicSemester.model";


const createAcademicSemesterService = async(payload: TAcademicSemester)=>{

    //semester name --> semester code

    type TAcademicSemesterCodeMapper = {
        [key: string] : string;
    }

    const academicSemesterCodeMapper : TAcademicSemesterCodeMapper = {
        Autumn: '01',
        Summer: '02',
        Fall: '03'
    }


    //academic semester name & code is not matching
    //academicSemesterCodeMapper['Fall'] !== '02 //dynamically value catch
    if(academicSemesterCodeMapper[payload.name] !== payload.code){
        throw new Error('Invalid Semester Code');
    }


    const result = await AcademicSemesterModel.create(payload);
    return result;
}



const getAllSemestersService = async() =>{
    const result = await AcademicSemesterModel.find();
    return result;
}

const getSingleSemesterService = async(id: string) =>{
    const ObjectId = Types.ObjectId;
    const result = await AcademicSemesterModel.findOne({_id: new ObjectId(id)});
    return result;
}






export {
    createAcademicSemesterService,
    getAllSemestersService,
    getSingleSemesterService
}