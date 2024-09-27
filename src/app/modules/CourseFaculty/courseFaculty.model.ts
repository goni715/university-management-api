import { model, Schema } from "mongoose";
import { TCourseFaculty } from "./courseFaculty.interface";

const courseFacultySchema = new Schema<TCourseFaculty>({
    course: {
      type: Schema.Types.ObjectId,
      unique: true,
      ref: 'Course',
      required:true,
    },
    faculties: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Faculty'
      }
    ]
  },
  {
    timestamps:true,
    versionKey: false
  }
) 
  
  
  const CourseFacultyModel = model<TCourseFaculty>('CourseFaculty', courseFacultySchema);
  export default CourseFacultyModel;