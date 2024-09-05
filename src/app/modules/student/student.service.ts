import StudentModel from './student.model';
import mongoose, { Types } from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import UserModel from '../user/user.model';
import { TStudent } from './student.interface';

const getAllStudentsService = async () => {
  const result = await StudentModel.find()
    .populate('admissionSemester')
    .populate({ path: 'academicDepartment', populate: 'academicFaculty' });

  return result;
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

    const existStudent = await StudentModel.findOne({ id });
    console.log(existStudent);
    if (!existStudent) {
      throw new AppError(404, 'This ID does not exist');
    }

    //delete a user (transaction-01)
    const deletedUser = await UserModel.updateOne(
      { id },
      { isDeleted: true },
      { session },
    );
    if (!deletedUser.modifiedCount) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failled to delete user');
    }

    //delete a student (transaction-02)
    const deletedStudent = await StudentModel.updateOne(
      { id },
      { isDeleted: true },
      { session },
    );
    if (!deletedStudent.modifiedCount) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failled to delete student');
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
