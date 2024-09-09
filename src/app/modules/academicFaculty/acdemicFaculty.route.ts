import express from 'express';
import validationMiddleware from '../../middlewares/validationMiddleware';
import { academicFacultyValidationSchema } from './academicFaculty.validation';
import { createAcademicFaculty, getAllAcademicFaculties, getSingleAcademicFaculty, updateAcademicFaculty } from './academicFaculty.controller';


const router = express.Router();


router.post('/create-academic-faculty', validationMiddleware(academicFacultyValidationSchema), createAcademicFaculty);
router.get('/get-all-academic-faculties', getAllAcademicFaculties);
router.get('/get-single-academic-faculty/:id', getSingleAcademicFaculty);
router.patch('/update-academic-faculty/:id', validationMiddleware(academicFacultyValidationSchema), updateAcademicFaculty);




export const AcademicFacultyRoutes = router;