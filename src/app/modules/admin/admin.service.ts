import mongoose, { Types } from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import UserModel from '../user/user.model';
import QueryBuilder from '../../builder/Querybuilder';
import { AdminModel } from './admin.model';
import { AdminSearchableFields } from './admin.constant';
import { TAdmin } from './admin.interface';

const getAllAdminsService = async (query: Record<string, unknown>) => {
 
  const queryBuilderInstance = new QueryBuilder(
    AdminModel.find(),
    query,
  );
  const adminQuery = queryBuilderInstance
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

    const result = await adminQuery.modelQuery;
    const meta = await adminQuery.countTotal();
    return {
      meta,
      result
    };
};



const getSingleAdminService = async (id: string) => {
  const ObjectId = Types.ObjectId;
  const result = await AdminModel.findOne({ _id: new ObjectId(id) });
  return result;
};



const updateAdminService = async (
  id: string,
  updateData: Partial<TAdmin>,
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
  const result = await AdminModel.updateOne(
    {
      _id: new ObjectId(id),
    },
    modifiedUpdatedData,
  );
  return result;
};



const deleteAdminService = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const ObjectId = Types.ObjectId;


    const existAdmin = await AdminModel.findOne({ _id: new ObjectId(id) });
    if (!existAdmin) {
      throw new AppError(404, 'This ID does not exist');
    }



     //delete a admin (transaction-01)
     const deletedAdmin = await AdminModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failled to delete admin');
    }


     // get user _id from deletedAdmin
     const userId = deletedAdmin.user;


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

    return deletedAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export {
  getAllAdminsService,
  getSingleAdminService,
  updateAdminService,
  deleteAdminService,
};
