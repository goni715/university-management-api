import express from 'express';
import validationMiddleware from '../../middlewares/validationMiddleware';
import { academicFacultyValidationSchema } from './academicFaculty.validation';
import { createAcademicFaculty, getAllAcademicFaculties, getSingleAcademicFaculty, updateAcademicFaculty } from './academicFaculty.controller';
import authMiddleware from '../../middlewares/authMiddleware';


const router = express.Router();


router.post('/create-academic-faculty', authMiddleware('superAdmin', 'admin'), validationMiddleware(academicFacultyValidationSchema), createAcademicFaculty);
router.get('/get-all-academic-faculties', authMiddleware('superAdmin', 'admin', 'faculty', 'student'), getAllAcademicFaculties);
router.get('/get-single-academic-faculty/:id',  authMiddleware('superAdmin', 'admin', 'faculty', 'student'), getSingleAcademicFaculty);
router.patch('/update-academic-faculty/:id', authMiddleware('superAdmin', 'admin'),  validationMiddleware(academicFacultyValidationSchema), updateAcademicFaculty);




export const AcademicFacultyRoutes = router;