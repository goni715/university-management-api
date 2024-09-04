import StudentModel from './student.model';
import { TStudent } from './student.interface';
import { Types } from 'mongoose';



const getAllStudentsService = async () => {
  const result = await StudentModel.find().
                     populate('admissionSemester').
                     populate({path:'academicDepartment', populate:"academicFaculty"});

  return result;
};

const getSingleStudentService = async (id: string) => {
  const ObjectId = Types.ObjectId;
  const result = await StudentModel.findOne({ _id : new ObjectId(id)})
                      .populate('admissionSemester')
                      .populate({path:'academicDepartment', populate:"academicFaculty"});
  
  return result
};


const deleteStudentService = async(id: string) => {
  const result = await StudentModel.updateOne({id}, {isDeleted: true})
  return result;
}



export { getAllStudentsService, getSingleStudentService, deleteStudentService };
