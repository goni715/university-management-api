import { Types } from 'mongoose';
import AcademicDepartmentModel from './academicDepartment.model';
import { TAcademicDepartment } from './academicDepartment.interface';

const createAcademicDepartmentService = async (PostBody: TAcademicDepartment) => {
  const result = await AcademicDepartmentModel.create(PostBody); //built-in static method
  return result;
};

const getAllDepartmentsService = async () => {
  const result = await AcademicDepartmentModel.find().populate('academicFaculty');
  return result;
};

const getSingleDepartmentService = async (id: string) => {
  const ObjectId = Types.ObjectId;
  const result = await AcademicDepartmentModel.findOne({ _id: new ObjectId(id) }).populate('academicFaculty');
  return result;
};

// const deleteFacultyService = async(id: string) => {
//   const result = await AcademicFacultyModel.updateOne({id}, {isDeleted: true})
//   return result;
// }


const updateDepartmentService = async (id: string, updateData: Partial<TAcademicDepartment>) => {
   
   const ObjectId = Types.ObjectId;
  
    const result = await AcademicDepartmentModel.updateOne(
      {
       _id: new ObjectId(id)
      },
      updateData
      );
    return result;
  };
  


export {
 createAcademicDepartmentService,
 getAllDepartmentsService,
 getSingleDepartmentService,
 updateDepartmentService
};
