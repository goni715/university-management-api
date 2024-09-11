import { Types } from 'mongoose';
import { TCourse } from './course.interface';
import CourseModel from './course.model';

const createCourseService = async (PostBody: TCourse) => {
  const result = await CourseModel.create(PostBody); //built-in static method
  return result;
};

const getAllCoursesService = async () => {
  const result = await CourseModel.find()
  return result;
};

const getSingleCourseService = async (id: string) => {
  const ObjectId = Types.ObjectId;
  const result = await CourseModel.findOne( { _id: new ObjectId(id)})
  return result;
};



// const updateDepartmentService = async (id: string, updateData: Partial<TAcademicDepartment>) => {
   
//    const ObjectId = Types.ObjectId;
  
//     const result = await CourseModel.updateOne(
//       {
//        _id: new ObjectId(id)
//       },
//       updateData
//       );
//     return result;
//   };
  


const deleteCourseService = async(id: string) => {
    const ObjectId = Types.ObjectId;
    const result = await CourseModel.updateOne({ _id: new ObjectId(id)}, {isDeleted: true})
    return result;
}



export {
 createCourseService,
 getAllCoursesService,
 getSingleCourseService,
 deleteCourseService
};
