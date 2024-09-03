import express from 'express';
import { createAcademicSemester, getAllSemesters, getSingleSemester, updateSemester } from './academicSemester.controller';
import validationMiddleware from '../../middlewares/validationMiddleware';
import { createAcademicSemesterValidationSchema, updateAcademicSemesterValidationSchema } from './academicSemester.validation';


const router = express.Router();


router.post('/create-academic-semester', validationMiddleware(createAcademicSemesterValidationSchema), createAcademicSemester);
router.get('/get-all-semesters', getAllSemesters);
router.get('/get-single-semester/:id', getSingleSemester);
router.patch('/update-semester/:id', validationMiddleware(updateAcademicSemesterValidationSchema), updateSemester);




export const AcademicSemesterRoutes = router;