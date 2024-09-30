import { Types } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import AcademicSemesterModel from './academicSemester.model';
import { academicSemesterCodeMapper, AcademicSemesterSearchableFields } from './academicSemeter.constant';
import QueryBuilder from '../../builder/Querybuilder';

const createAcademicSemesterService = async (payload: TAcademicSemester) => {
  //semester name --> semester code

  type TAcademicSemesterCodeMapper = {
    [key: string]: string;
  };

  const academicSemesterCodeMapper: TAcademicSemesterCodeMapper = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
  };

  //academic semester name & code is not matching
  //academicSemesterCodeMapper['Fall'] !== '02 //dynamically value catch
  if (academicSemesterCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code');
  }

  const result = await AcademicSemesterModel.create(payload);
  return result;
};

const getAllSemestersService = async (query: Record<string, unknown>) => {
  const academicSemesterQuery = new QueryBuilder(AcademicSemesterModel.find(), query)
  .search(AcademicSemesterSearchableFields)
  .filter()
  .sort()
  .paginate()
  .fields();

const result = await academicSemesterQuery.modelQuery;
const meta = await academicSemesterQuery.countTotal();

return {
  meta,
  result
}

};

const getSingleSemesterService = async (id: string) => {
    const ObjectId = Types.ObjectId;
    const result = await AcademicSemesterModel.findOne({ _id: new ObjectId(id) });
    return result;
};




const updateSemesterService = async (id: string, updateData: Partial<TAcademicSemester>) => {
  const ObjectId = Types.ObjectId;
  const {name, code, year} = updateData;

  if(name && code && academicSemesterCodeMapper[name] !== code){
    throw new Error('Invalid Semester Code');
  }

  const semesters = await AcademicSemesterModel.find({ _id: { $ne: new ObjectId(id) } });

  const existSemester = semesters.find((cv)=>cv.name=== name && cv.year===year);
  if(existSemester){
    throw new Error('Already Existed This Semester');
  }




  const result = await AcademicSemesterModel.updateOne(
    {
     _id: new ObjectId(id)
    },
    updateData
    );
  return result;
};

export {
  createAcademicSemesterService,
  getAllSemestersService,
  getSingleSemesterService,
  updateSemesterService
};
