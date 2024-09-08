import express from 'express';
import { createAdmin, createStudent } from './user.controller';
import { createStudentValidationSchema } from '../student/student.validation';
import validationMiddleware from '../../middlewares/validationMiddleware';
import { createAdminValidationSchema } from '../admin/admin.validation';

const router = express.Router();

router.post(
  '/create-student',
  validationMiddleware(createStudentValidationSchema),
  createStudent,
);

router.post(
  '/create-admin',
  validationMiddleware(createAdminValidationSchema),
  createAdmin,
);



export const UserRoutes = router;
