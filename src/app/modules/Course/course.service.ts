import mongoose, { Types } from 'mongoose';
import { TCourse } from './course.interface';
import CourseModel from './course.model';
import QueryBuilder from '../../builder/Querybuilder';
import { CourseSearchableFields } from './course.constant';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

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
  const result = await CourseModel.findOne( { _id: new ObjectId(id)})
  return result;
};



const updateCourseService = async (id: string, updateData: Partial<TCourse>) => {
   
   const ObjectId = Types.ObjectId;
   const {preRequisiteCourses, ...courseRemainingData} = updateData;

   const session = await mongoose.startSession();

   try{


     session.startTransaction();

       //step1: update basic course info
       const updateBasicCourseInfo = await CourseModel.updateOne(
        {
         _id: new ObjectId(id)
        },
        courseRemainingData,
        {session}
      );

      if (!updateBasicCourseInfo.modifiedCount) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failled to update course ');
      }
  
  
    
        //check if there is any pre requisite courses to update
        if(preRequisiteCourses && preRequisiteCourses.length > 0){
          //filter out the deleted course fields//conditions = if isDeleted===true & there is courseId
            const deletedPreRequisites = preRequisiteCourses?.filter((cv)=>cv.course && cv.isDeleted).map((cv)=>cv.course)
             //output = ["66e1ab282b67e60128f419f9", "66e1ab282b67e60128f319f8"]
  
             const deletePreRequisitesCourses = await CourseModel.updateOne(
              { _id: new ObjectId(id)},
              {
                $pull: {preRequisiteCourses: {course: { $in: deletedPreRequisites}}}
              },
              {session}
             )


             if (!deletePreRequisitesCourses.modifiedCount) {
              throw new AppError(httpStatus.BAD_REQUEST, 'Failled to update course ');
            }


  
              //filter out the new course fields//conditions = if isDeleted===false & there is courseId
             const newPreRequisites = preRequisiteCourses?.filter((cv)=>cv.course && !cv.isDeleted)
             //output = [course:"66e1ab282b67e60128f419f9", isDeleted:false]
  
             const addNewPreRequisitesCourses = await CourseModel.updateOne(
              { _id: new ObjectId(id)},
              {
                $addToSet: {preRequisiteCourses: {$each: newPreRequisites}}
              },
              {session}    
             )

             if (!addNewPreRequisitesCourses.modifiedCount) {
              throw new AppError(httpStatus.BAD_REQUEST, 'Failled to update course ');
            }

        }
  
  
        const result = await CourseModel.findOne( { _id: new ObjectId(id)}).populate('preRequisiteCourses.course');

        //session is success
        await session.commitTransaction();
        await session.endSession();
        return result;

   }catch(err:any){
     await session.abortTransaction();
     await session.endSession();
     throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course')
   }
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
