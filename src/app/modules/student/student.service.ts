import StudentModel from './student.model';
import { TStudent } from './student.interface';

const createStudentService = async (studentData: TStudent) => {
  const existingUser = await StudentModel.isUserExists(studentData?.id); //custom static-method
  if (existingUser) {
    throw new Error('User already existed');
  }

  const result = await StudentModel.create(studentData); //built-in static method
  return result;

  // const student = new StudentModel(studentData); //create an instance
  // const existingUser = await student.isUserExists('6'); //custom instance method
  // if (existingUser) {
  //   throw new Error('User already existed');
  // }

  // const result = await student.save(); //bulit-in-instance method
  //return result;
};

const getAllStudentsService = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentService = async (id: string) => {
  //const result = await StudentModel.findOne({ id });
  const result = await StudentModel.aggregate([
    {$match: {id:id}}
  ])
  return result[0];
};


const deleteStudentService = async(id: string) => {
  const result = await StudentModel.updateOne({id}, {isDeleted: true})
  return result;
}



export { createStudentService, getAllStudentsService, getSingleStudentService, deleteStudentService };
