import express from 'express';
import { createAcademicSemester, getAllSemesters, getSingleSemester } from './academicSemester.controller';
import validationMiddleware from '../../middlewares/validationMiddleware';
import { createAcademicSemesterValidationSchema } from './academicSemester.validation';


const router = express.Router();


router.post('/create-academic-semester', validationMiddleware(createAcademicSemesterValidationSchema), createAcademicSemester);
router.get('/get-all-semesters', getAllSemesters);
router.get('/get-single-semester/:id', getSingleSemester);




export const AcademicSemesterRoutes = router;