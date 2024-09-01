import config from "../../config";
import { TStudent } from "../student/student.interface";
import StudentModel from "../student/student.model";
import { NewUser, TUser } from "./user.interface";
import UserModel from "./user.model";


const createStudentService = async (password:string, studentData: TStudent) => {
  // create a user object
  //const userData: NewUser = {password:'', role:'', id:''};
  const userData: Partial<TUser> = {}
  
   //if password is not given, use default password
   userData.password = password || (config.default_password as string)

   //set student 
   userData.role = 'student';

   //set manually generated id
   userData.id='231'

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
    return newUser;
  };


  

  export const UserServices = {
    createStudentService
  }