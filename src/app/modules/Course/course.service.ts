import { Types } from 'mongoose';
import { TCourse } from './course.interface';
import CourseModel from './course.model';
import QueryBuilder from '../../builder/Querybuilder';
import { CourseSearchableFields } from './course.constant';

const createCourseService = async (PostBody: TCourse) => {
  const result = await CourseModel.create(PostBody); //built-in static method
  return result;
};

const getAllCoursesService = async (query: Record<string, unknown>) => {
  const queryBuilderInstance = new QueryBuilder(CourseModel.find().populate('preRequisiteCourses.course'), query);
  const courseQuery = queryBuilderInstance.search(CourseSearchableFields).filter().sort().paginate().fields();
  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseService = async (id: string) => {
  const ObjectId = Types.ObjectId;
  const result = await CourseModel.findOne( { _id: new ObjectId(id)}).populate('preRequisiteCourses.course')
  return result;
};



const updateCourseService = async (id: string, updateData: Partial<TCourse>) => {
   
   const ObjectId = Types.ObjectId;
   const {preRequisiteCourses, ...courseRemainingData} = updateData;

   //step1: update basic course info

    const updateBasicCourseInfo = await CourseModel.updateOne(
      {
       _id: new ObjectId(id)
      },
      courseRemainingData
      );


  
      //check if there is any pre requisite courses to update
      if(preRequisiteCourses && preRequisiteCourses.length > 0){
        //filter out the deleted fields//conditions = if isDeleted===true & there is courseId
          const deletedPreRequisites = preRequisiteCourses?.filter((cv)=>cv.course && cv.isDeleted).map((cv)=>cv.course)
           //output = ["66e1ab282b67e60128f419f9", "66e1ab282b67e60128f319f8"]

           const deletePreRequisitesCourses = await CourseModel.updateOne(
            { _id: new ObjectId(id)},
            {
              $pull: {preRequisiteCourses: {course: { $in: deletedPreRequisites}}}
            }
           )
      }








    return updateBasicCourseInfo;
  };
  


const deleteCourseService = async(id: string) => {
    const ObjectId = Types.ObjectId;
    const result = await CourseModel.updateOne({ _id: new ObjectId(id)}, {isDeleted: true})
    return result;
}



export {
 createCourseService,
 getAllCoursesService,
 getSingleCourseService,
 updateCourseService,
 deleteCourseService
};
