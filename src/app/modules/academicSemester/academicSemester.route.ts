import express from 'express';
import { createAcademicSemester } from './academicSemester.controller';
import validationMiddleware from '../../middlewares/validationMiddleware';
import { createAcademicSemesterValidationSchema } from './academicSemester.validation';


const router = express.Router();


router.post('/create-academic-semester', validationMiddleware(createAcademicSemesterValidationSchema), createAcademicSemester);




export const AcademicSemesterRoutes = router;