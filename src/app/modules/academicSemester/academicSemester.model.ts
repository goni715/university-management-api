import { model, Schema } from 'mongoose';
import { TAcademicSemester} from './academicSemester.interface';
import { AcademicSemesterCode, AcademicSemesterName, Months } from './academicSemeter.constant';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';


const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    enum: AcademicSemesterName,
    required: true
  },
  code: {
    type: String,
    enum: AcademicSemesterCode,
    required: true
  },
  year: {
    type: String,
    required: true,
  },
  startMonth: {
    type: String,
    enum: Months,
    required: true
  },
  endMonth: {
    type: String,
    enum: Months,
    required: true
  },
},
{timestamps: true}
);



//checking already semester is existed
academicSemesterSchema.pre('save', async function(next){
  const isSemesterExists = await AcademicSemesterModel.findOne({
    name: this.name,
    year: this.year
  });

  if(isSemesterExists){
    throw new AppError(httpStatus.CONFLICT,'Semester is already exists');
  }
  next()
})



const AcademicSemesterModel = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);

export default AcademicSemesterModel;
