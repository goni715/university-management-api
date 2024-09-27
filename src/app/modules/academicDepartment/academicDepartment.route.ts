import express from 'express';
import validationMiddleware from '../../middlewares/validationMiddleware';
import {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
} from './academicDepartment.validation';
import {
  createAcademicDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
} from './academicDepartment.controller';
import authMiddleware from '../../middlewares/authMiddleware';

const router = express.Router();

router.post('/create-academic-department', authMiddleware('superAdmin', 'admin'),  validationMiddleware(createAcademicDepartmentValidationSchema), createAcademicDepartment);
router.get('/get-all-departments', authMiddleware('superAdmin', 'admin', 'faculty', 'student'), getAllDepartments);
router.get('/get-single-department/:id', authMiddleware('superAdmin', 'admin', 'faculty', 'student'), getSingleDepartment);
router.patch(
  '/update-department/:id',
  authMiddleware('superAdmin', 'admin'),
  validationMiddleware(updateAcademicDepartmentValidationSchema),
  updateDepartment,
);

export const AcademicDepartmentRoutes = router;
