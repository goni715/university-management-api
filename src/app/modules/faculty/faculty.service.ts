import mongoose, { Types } from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import UserModel from '../user/user.model';
import QueryBuilder from '../../builder/Querybuilder';
import FacultyModel from './faculty.model';
import { FacultySearchableFields } from './faculty.constant';
import { TFaculty } from './faculty.interface';

const getAllFacultiesService = async (query: Record<string, unknown>) => {
 
  const queryBuilderInstance = new QueryBuilder(
    FacultyModel.find(),
    query,
  );
  const facultyQuery = queryBuilderInstance
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

    const result = await facultyQuery.modelQuery;
    const meta = await facultyQuery.countTotal();
    return {
      meta,
      result,
    };
};



const getSingleFacultyService = async (id: string) => {
  const ObjectId = Types.ObjectId;
  const result = await FacultyModel.findOne({ _id: new ObjectId(id) });
  return result;
};



const updateFacultyService = async (
  id: string,
  updateData: Partial<TFaculty>,
) => {
  const { name, ...remainingAdminData } = updateData;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  /*
    name.firstName = 'Mezba'
    name.lastName = 'Abedin'
  */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

 

  const ObjectId = Types.ObjectId;
  const result = await FacultyModel.updateOne(
    {
      _id: new ObjectId(id),
    },
    modifiedUpdatedData,
  );
  return result;
};



const deleteFacultyService = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const ObjectId = Types.ObjectId;


    const existFaculty = await FacultyModel.findOne({ _id: new ObjectId(id) });
    if (!existFaculty) {
      throw new AppError(404, 'This ID does not exist');
    }



     //delete a faculty (transaction-01)
     const deletedFaculty = await FacultyModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failled to delete faculty');
    }


     // get user _id from deletedFaculty
     const userId = deletedFaculty.user;


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

    return deletedFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export {
  getAllFacultiesService,
  getSingleFacultyService,
  updateFacultyService,
  deleteFacultyService,
};
