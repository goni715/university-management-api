import { Types } from 'mongoose';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import UserModel from './user.model';
import StudentModel from '../student/student.model';


//findLastStudentId with admissionSemesterId
const findLastStudentId = async (id : Types.ObjectId) => {
    const lastStudent = await StudentModel.findOne(
      { admissionSemester: id},
      { id: 1, _id: 0 },
    )
      .sort({ createdAt: -1 })
      .lean();
  
    //202401 0001
    return lastStudent?.id ? lastStudent.id : undefined;
  };


export const generateStudentId = async (
    admissionSemester: TAcademicSemester & {_id: Types.ObjectId}, //using intersection
  ) => {
    const {_id, name, code:currentSemesterCode, year:currentSemesterYear } = admissionSemester;
   
    //first time 0000
    let currentId = (0).toString();
  
    const lastStudentId = await findLastStudentId(_id);
   
    // 2030 01 0001
   const lastStudentSemesterCode = lastStudentId?.substring(4, 6); //01;
   const lastStudentYear = lastStudentId?.substring(0, 4); // 2030
  
    //যদি lastStudentId থাকে, এবং lastStudentSemesterCode ও currentSemesterCode সমান হয়। এবং lastStudentYear ও currentSemesterYear সমান হয়।
    if(lastStudentId && lastStudentSemesterCode === currentSemesterCode && lastStudentYear === currentSemesterYear){
      currentId = lastStudentId.substring(6); // 00001
    }
  
    
  
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  
    incrementId = `${currentSemesterYear}${currentSemesterCode}${incrementId}`;
    //console.log(incrementId);
  
    return incrementId;
  };





// ------------------------------------Generate Admin Id part -------------------------------------------------//
//------------------------------------------------------------------------------------------------------------//
  
// Admin ID
export const findLastAdminId = async () => {
  const lastAdmin = await UserModel.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};



export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `A-${incrementId}`;
  return incrementId;
};
