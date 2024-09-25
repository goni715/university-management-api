import mongoose, { Types } from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import AcademicSemesterModel from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import StudentModel from '../student/student.model';
import { TUser } from './user.interface';
import UserModel from './user.model';
import { generateAdminId, generateFacultyId, generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import { TAdmin } from '../admin/admin.interface';
import { AdminModel } from '../admin/admin.model';
import { TFaculty } from '../faculty/faculty.interface';
import AcademicDepartmentModel from '../academicDepartment/academicDepartment.model';
import FacultyModel from '../faculty/faculty.model';
import uploadImageToCloudinary from '../../utils/uploadImageToCloudinary';


const createStudentService = async (
  file: any,
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

    //set student role
    userData.role = 'student';
    //set student email
    userData.email = studentData.email;

    //find academic semester info
    const admissionSemester = await AcademicSemesterModel.findById(
      studentData.admissionSemester,
    );

    //set manually generated id
    userData.id = await generateStudentId(
      admissionSemester as TAcademicSemester & { _id: Types.ObjectId },
    );

    //upload image to cloudinary
    const cloudinaryRes = await uploadImageToCloudinary(file?.path);

    //create a user (transaction-01)
    const newUser = await UserModel.create([userData], { session }); //built-in static method
    if (!newUser.length) {
      throw new AppError(400, 'Failled to create user');
    }

    // set id, _id as user
    studentData.id = newUser[0].id;
    studentData.user = newUser[0]._id;
    studentData.profileImg = cloudinaryRes?.secure_url;

    //create a student (transaction-02)
    const newStudent = await StudentModel.create([studentData], { session });

    if (!newStudent.length) {
      throw new AppError(400, 'Failled to create student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent[0];
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};



const createAdminService = async (
  file: any,
  password: string,
  adminData: TAdmin,
) => {
  
    // create a user object
    const userData: Partial<TUser> = {};

    //if password is not given, use default password
    userData.password = password || (config.default_password as string);

    //set admin role
    userData.role = 'admin';
    //set admin email
    userData.email = adminData.email;
    const session = await mongoose.startSession();

  try {
    session.startTransaction();

    //set manually generated id
    userData.id = await generateAdminId();

    //upload image to cloudinary
    const cloudinaryRes = await uploadImageToCloudinary(file?.path);

    //create a user (transaction-01)
    const newUser = await UserModel.create([userData], { session }); //built-in static method
    if (!newUser.length) {
      throw new AppError(400, 'Failled to create user');
    }

    //set id, _id as user
    adminData.id = newUser[0].id;
    adminData.user = newUser[0]._id;
    adminData.profileImg = cloudinaryRes?.secure_url;

    //create a admin (transaction-02)
    const newAdmin = await AdminModel.create([adminData], { session });

    if (!newAdmin.length) {
      throw new AppError(400, 'Failled to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin[0];
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createFacultyService = async (
  file: any,
  password: string,
  facultyData: TFaculty,
) => {
  
    // create a user object
    const userData: Partial<TUser> = {};

    //if password is not given, use default password
    userData.password = password || (config.default_password as string);

    //set faculty role
    userData.role = 'faculty';
    //set faculty email
    userData.email = facultyData.email;

     // find academic department info
  const academicDepartment = await AcademicDepartmentModel.findById(
    facultyData.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  //set academic FacultyId
  facultyData.academicFaculty = academicDepartment?.academicFaculty;

    const session = await mongoose.startSession();

  try {
    session.startTransaction();

    //set manually generated id
    userData.id = await generateFacultyId();

     //upload image to cloudinary
     const cloudinaryRes = await uploadImageToCloudinary(file?.path);

    //create a user (transaction-01)
    const newUser = await UserModel.create([userData], { session }); //built-in static method
    if (!newUser.length) {
      throw new AppError(400, 'Failled to create user');
    }

    //set id, _id as user
    facultyData.id = newUser[0].id;
    facultyData.user = newUser[0]._id;
    facultyData.profileImg = cloudinaryRes?.secure_url;

    //create a admin (transaction-02)
    const newFaculty = await FacultyModel.create([facultyData], { session });

    if (!newFaculty.length) {
      throw new AppError(400, 'Failled to create a Faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty[0];
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};


const getAllUsersService = async () => {
  const result = await UserModel.find();
  return result;
};


const getSingleUserService = async (id: string) => {
  const ObjectId = Types.ObjectId;
  const result = await UserModel.findOne({ _id: new ObjectId(id) });
  return result;
};


const getMeService = async (id: string, role: string) => {

  let result = null;

  if(role === "student"){
    result = await StudentModel.findOne({ id }).populate('user');
  }
  
  if(role === "faculty"){
    result = await FacultyModel.findOne({ id }).populate('user');
  }

  if(role === "admin"){
    result = await AdminModel.findOne({ id }).populate('user');
  }

  return result;
};


const changeStatusService = async (id: string, payload: { status: string }) => {
  const ObjectId = Types.ObjectId;
   const result = await UserModel.updateOne(
    {_id: new ObjectId(id)},
    payload
   );

   return result;
}


export const UserServices = {
  createStudentService,
  createAdminService,
  createFacultyService,
  getAllUsersService,
  getSingleUserService,
  getMeService,
  changeStatusService
};
