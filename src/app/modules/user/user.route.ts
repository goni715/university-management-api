import express from 'express';
import {
  changeStatus,
  createAdmin,
  createFaculty,
  createStudent,
  getAllUsers,
  getMe,
  getSingleUser,
} from './user.controller';
import { createStudentValidationSchema } from '../student/student.validation';
import validationMiddleware from '../../middlewares/validationMiddleware';
import { createAdminValidationSchema } from '../admin/admin.validation';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import authMiddleware from '../../middlewares/authMiddleware';
import { UserRole } from './user.constant';
import { changeStatusValidationSchema } from './user.validation';

const router = express.Router();

router.post(
  '/create-student',
  authMiddleware(UserRole.admin),
  validationMiddleware(createStudentValidationSchema),
  createStudent,
);

router.post(
  '/create-admin',
  validationMiddleware(createAdminValidationSchema),
  createAdmin,
);

router.post(
  '/create-faculty',
  validationMiddleware(createFacultyValidationSchema),
  createFaculty,
);

router.get('/get-all-users', authMiddleware(UserRole.admin), getAllUsers);
router.get('/get-single-user/:id', getSingleUser);
router.get('/get-me', authMiddleware('student', 'faculty', 'admin'), getMe);
router.patch('/change-status/:id', authMiddleware('admin'), validationMiddleware(changeStatusValidationSchema), changeStatus);


export const UserRoutes = router;
