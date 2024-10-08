import { model, Schema } from 'mongoose';
import { TCourse, TPreRequisiteCourses } from './course.interface';

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>(
  {
    course: { type: Schema.Types.ObjectId, ref: 'Course' },
    isDeleted: { type: Boolean, default: false },
  },
  {
     _id: false ,
     //timestamps:true
  },
);

const courseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      unique: true,
      trim: true,
    },
    prefix: {
      type: String,
      required: [true, 'Prefix is required'],
      trim: true,
    },
    code: {
      type: Number,
      required: [true, 'Code is required'],
      unique: true,
      trim: true,
    },
    credits: {
      type: Number,
      required: [true, 'Credits is required'],
      trim: true,
    },
    preRequisiteCourses: [preRequisiteCoursesSchema],
    isDeleted: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const CourseModel = model<TCourse>('Course', courseSchema);

export default CourseModel;
