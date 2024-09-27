import { Types } from "mongoose";
import { TCourseFaculty } from "./courseFaculty.interface";
import CourseFacultyModel from "./courseFaculty.model";

const assignCourseFacultiesService = async(id: string, faculties: Partial<TCourseFaculty>) => {
    const ObjectId = Types.ObjectId;
  
    //using updateOne()
    const result = await CourseFacultyModel.updateOne(
      { _id: new ObjectId(id)},
      {
        course: id,
        $addToSet: { faculties: {$each: faculties} }
      },
      {upsert:true}
    )
  
    //using findByIdAndUpdate()
    // const result = await CourseFacultyModel.findByIdAndUpdate(
    //   id,
    //   {
    //     course: id,
    //     $addToSet: { faculties: {$each: faculties} }
    //   },
    //   {upsert:true, new:true}
    // )
    return result;
  }
  
  
  const removeFacultiesFromCourseService = async(id: string, faculties: Partial<TCourseFaculty>) => {
    const ObjectId = Types.ObjectId;
  
    //using updateOne()
    // const result = await CourseFacultyModel.updateOne(
    //   { _id: new ObjectId(id)},
    //   {
    //     $pull: { faculties: {$in: faculties} }
    //   },
    //   {upsert:true}
    // )
  
    //using findByIdAndUpdate()
    const result = await CourseFacultyModel.findByIdAndUpdate(
      id,
      {
        $pull: { faculties: {$in: faculties} }
      },
      {new:true}
    )
    return result;
  }
  
  
  const getAllCourseFacultiesService = async () => {
    const result = await CourseFacultyModel.find().populate('course', 'title');
    return result;
  };

  const getFacultiesWithCourseService = async (courseId: string) => {
    const result = await CourseFacultyModel.findOne({course: courseId}).populate('faculties');
    return result;
  };




  export {
    assignCourseFacultiesService,
    removeFacultiesFromCourseService,
    getAllCourseFacultiesService,
    getFacultiesWithCourseService
  }