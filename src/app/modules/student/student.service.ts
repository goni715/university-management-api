import StudentModel from './student.model';
import mongoose, { Types } from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import UserModel from '../user/user.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/Querybuilder';
import { studentSearchableFields } from './student.constant';

const getAllStudentsService = async (query: Record<string, unknown>) => {
  //{email: { $regex: query.searchKey, $options: 'i}}
  //{permanentAddress: { $regex: query.searchKey, $options: 'i}}
  //{presentAddress: { $regex: query.searchKey, $options: 'i}}
  //{name.firstName: { $regex: query.searchKey, $options: 'i}}

  // let searchTerm = '';
  // if(query?.searchTerm){
  //   searchTerm = query.searchTerm as string;
  // }

  // const searchFields = ['email', 'permanentAddress', 'presentAddress', 'name.firstName', 'name.middleName', 'name.lastName', 'contactNo', 'emergencyContactNo', 'guardian.fatherName', 'guardian.fatherOccupation', 'guardian.fatherContactNo', 'guardian.motherName', 'guardian.motherContactNo', 'guardian.motherOccupation'];

  // const searchQuery = StudentModel.find({
  //   $or: searchFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // })

  //filtering
  //  const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  //  const queryObj = {...query}

  //  excludeFields.map((el)=> delete queryObj[el]);

  //  const filterQuery = searchQuery
  //     .find(queryObj)
  //     .populate('admissionSemester')
  //     .populate({ path: 'academicDepartment', populate: 'academicFaculty' });

  //sorting
  // let sort = '-createdAt' // by default
  // if(query?.sort){
  //   sort=query.sort as string;
  // }

  // const sortQuery = filterQuery.sort(sort) //-createdAt

  //limiting
  // let limit = 10;
  // if(query?.limit){
  //   limit = query.limit as number;
  // }

  // const limitQuery = sortQuery.limit(limit);

  //paginatating
  //   let page = 1;
  //   let skip=0;

  //   if(query?.page){
  //     page = Number(query.page);
  //     skip = Number(page-1) * limit
  //   }

  //  const paginateQuery = limitQuery.skip(skip);

  //field limiting
  //fields = query.fields // fields: 'name, email'
  //  let fields = '';
  //  if(query.fields){
  //   fields = (query.fields as string).split(',').join('') //fields = 'name email'
  //  }

  //  const fieldQuery = await paginateQuery.select(fields);

  //   return fieldQuery;;

  const queryBuilderInstance = new QueryBuilder(
    StudentModel.find()
      .populate('admissionSemester')
      .populate({ path: 'academicDepartment', populate: 'academicFaculty' }),
    query,
  );
  const studentQuery = queryBuilderInstance
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  const meta = await studentQuery.countTotal();

  return {
    meta,
    result,
  };

};

const getSingleStudentService = async (id: string) => {
  const ObjectId = Types.ObjectId;
  const result = await StudentModel.findOne({ _id: new ObjectId(id) })
    .populate('admissionSemester')
    .populate({ path: 'academicDepartment', populate: 'academicFaculty' });

  return result;
};

const updateStudentService = async (
  id: string,
  updateData: Partial<TStudent>,
) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = updateData;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  /*
    guardain: {
      fatherOccupation:"Teacher"
    }

    guardian.fatherOccupation = Teacher

    name.firstName = 'Mezba'
    name.lastName = 'Abedin'
  */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const ObjectId = Types.ObjectId;
  const result = await StudentModel.updateOne(
    {
      _id: new ObjectId(id),
    },
    modifiedUpdatedData,
  );
  return result;
};



const deleteStudentService = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const ObjectId = Types.ObjectId;


    const existStudent = await StudentModel.findOne({ _id: new ObjectId(id) });
    if (!existStudent) {
      throw new AppError(404, 'This ID does not exist');
    }



     //delete a student (transaction-01)
     const deletedStudent = await StudentModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failled to delete student');
    }


     // get user _id from deletedStudent
     const userId = deletedStudent.user;


    //delete a user (transaction-02)
    const deletedUser = await UserModel.updateOne(
      { _id: new ObjectId(userId) },
      { isDeleted: true },
      { session },
    );
    if (!deletedUser.modifiedCount) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failled to delete user');
    }

   

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export {
  getAllStudentsService,
  getSingleStudentService,
  updateStudentService,
  deleteStudentService,
};
