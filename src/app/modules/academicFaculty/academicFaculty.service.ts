import { Types } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';
import AcademicFacultyModel from './academicFaculty.model';

const createAcademicFacultyService = async (PostBody: TAcademicFaculty) => {
  const result = await AcademicFacultyModel.create(PostBody); //built-in static method
  return result;
};

const getAllFacultiesService = async () => {
  const result = await AcademicFacultyModel.find();
  return result;
};

const getSingleFacultyService = async (id: string) => {
  const ObjectId = Types.ObjectId;
  const result = await AcademicFacultyModel.findOne({ _id: new ObjectId(id) });
  return result;
};

// const deleteFacultyService = async(id: string) => {
//   const result = await AcademicFacultyModel.updateOne({id}, {isDeleted: true})
//   return result;
// }


const updateFacultyService = async (id: string, updateData: TAcademicFaculty) => {
   
   const ObjectId = Types.ObjectId;
  
    const result = await AcademicFacultyModel.updateOne(
      {
       _id: new ObjectId(id)
      },
      updateData
      );
    return result;
  };
  


export {
  createAcademicFacultyService,
  getAllFacultiesService,
  getSingleFacultyService,
  updateFacultyService
};
