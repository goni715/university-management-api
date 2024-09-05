import express from 'express';
import validationMiddleware from '../../middlewares/validationMiddleware';
import { createAcademicDepartmentValidationSchema, updateAcademicDepartmentValidationSchema } from './academicDepartment.validation';
import { createAcademicDepartment, getAllDepartments, getSingleDepartment, updateDepartment } from './academicDepartment.controller';


const router = express.Router();


router.post('/create-academic-department', createAcademicDepartment);
router.get('/get-all-departments', getAllDepartments);
router.get('/get-single-department/:id', getSingleDepartment);
router.patch('/update-department/:id', validationMiddleware(updateAcademicDepartmentValidationSchema), updateDepartment);




export const AcademicDepartmentRoutes = router;