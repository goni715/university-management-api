import express from 'express';
import validationMiddleware from '../../middlewares/validationMiddleware';
import { academicFacultyValidationSchema } from './academicFaculty.validation';
import { createAcademicFaculty, getAllFaculties, getSingleFaculty, updateFaculty } from './academicFaculty.controller';


const router = express.Router();


router.post('/create-academic-faculty', validationMiddleware(academicFacultyValidationSchema), createAcademicFaculty);
router.get('/get-all-faculties', getAllFaculties);
router.get('/get-single-faculty/:id', getSingleFaculty);
router.patch('/update-faculty/:id', validationMiddleware(academicFacultyValidationSchema), updateFaculty);




export const AcademicFacultyRoutes = router;