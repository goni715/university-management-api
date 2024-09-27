import express from 'express';
import { createAcademicSemester, getAllSemesters, getSingleSemester, updateSemester } from './academicSemester.controller';
import validationMiddleware from '../../middlewares/validationMiddleware';
import { createAcademicSemesterValidationSchema, updateAcademicSemesterValidationSchema } from './academicSemester.validation';
import authMiddleware from '../../middlewares/authMiddleware';


const router = express.Router();


router.post('/create-academic-semester', authMiddleware('admin', 'superAdmin'), validationMiddleware(createAcademicSemesterValidationSchema), createAcademicSemester);
router.get('/get-all-semesters', authMiddleware('superAdmin', 'admin', 'faculty', 'student'), getAllSemesters);
router.get('/get-single-semester/:id', authMiddleware('superAdmin', 'admin', 'faculty', 'student'), getSingleSemester);
router.patch('/update-semester/:id', authMiddleware('admin', 'superAdmin'),  validationMiddleware(updateAcademicSemesterValidationSchema), updateSemester);




export const AcademicSemesterRoutes = router;