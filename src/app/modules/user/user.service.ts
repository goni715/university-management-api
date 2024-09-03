import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import AcademicSemesterModel from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import StudentModel from "../student/student.model";
import { NewUser, TUser } from "./user.interface";
import UserModel from "./user.model";
import { generateStudentId } from "./user.utils";


const createStudentService = async (password:string, studentData: TStudent) => {
  // create a user object
  //const userData: NewUser = {password:'', role:'', id:''};
  const userData: Partial<TUser> = {}
  
   //if password is not given, use default password
   userData.password = password || (config.default_password as string)

   //set student 
   userData.role = 'student';


   //find academic semester info
   const admissionSemester = await AcademicSemesterModel.findById(studentData.admissionSemester);

   //set manually generated id
   userData.id= await generateStudentId(admissionSemester as TAcademicSemester);

   //create a user
    const newUser = await UserModel.create(userData); //built-in static method
    if(newUser){
      // set id, _id as user
      studentData.id = newUser.id;
      studentData.user = newUser._id;
      
      const newStudent = await StudentModel.create(studentData);
      return newStudent;
    }
    //or
    // if(Object.keys(newUser).length){
    //   studentData.id = newUser.id;
    //   studentData.user = newUser._id; //userId-- referceId
    // }
    //return admissionSemester;
  };


  

  export const UserServices = {
    createStudentService
  }