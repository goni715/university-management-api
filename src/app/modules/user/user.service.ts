import mongoose, { Types } from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import AcademicSemesterModel from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import StudentModel from '../student/student.model';
import { NewUser, TUser } from './user.interface';
import UserModel from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../utils/AppError';

const createStudentService = async (
  password: string,
  studentData: TStudent,
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // create a user object
    //const userData: NewUser = {password:'', role:'', id:''};
    const userData: Partial<TUser> = {};

    //if password is not given, use default password
    userData.password = password || (config.default_password as string);

    //set student
    userData.role = 'student';

    //find academic semester info
    const admissionSemester = await AcademicSemesterModel.findById(
      studentData.admissionSemester,
    );

    //set manually generated id
    userData.id = await generateStudentId(
      admissionSemester as TAcademicSemester & { _id: Types.ObjectId },
    );

    //create a user (transaction-01)
    const newUser = await UserModel.create([userData], { session }); //built-in static method
    if (!newUser.length) {
      throw new AppError(400, 'Failled to create user');
    }

    // set id, _id as user
    studentData.id = newUser[0].id;
    studentData.user = newUser[0]._id;

    //create a student (transaction-02)
    const newStudent = await StudentModel.create([studentData], { session });

    if (!newStudent.length) {
      throw new AppError(400, 'Failled to create student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent[0];
  } catch (err:any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err)
  }
};

export const UserServices = {
  createStudentService,
};
