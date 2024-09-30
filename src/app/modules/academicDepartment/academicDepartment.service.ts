import { Types } from 'mongoose';
import AcademicDepartmentModel from './academicDepartment.model';
import { TAcademicDepartment } from './academicDepartment.interface';
import QueryBuilder from '../../builder/Querybuilder';
import { AcademicDepartmentSearchableFields } from './academicDepartment.constant';

const createAcademicDepartmentService = async (PostBody: TAcademicDepartment) => {
  const result = await AcademicDepartmentModel.create(PostBody); //built-in static method
  return result;
};

const getAllDepartmentsService = async (query: Record<string, unknown>) => {

  const academicDepartmentQuery = new QueryBuilder(
    AcademicDepartmentModel.find().populate('academicFaculty'),
    query,
  )
    .search(AcademicDepartmentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await academicDepartmentQuery.modelQuery;
  const meta = await academicDepartmentQuery.countTotal();

  return {
    meta,
    result,
  };
  
};

const getSingleDepartmentService = async (id: string) => {
  const result = await AcademicDepartmentModel.findById(id).populate('academicFaculty');
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
