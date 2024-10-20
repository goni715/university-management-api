import express, { NextFunction, Request, Response } from 'express';
import {
  changeStatus,
  createAdmin,
  createFaculty,
  createStudent,
  getAllUsers,
  getMe,
  getSingleUser,
  uploadImage,
} from './user.controller';
import { createStudentValidationSchema } from '../student/student.validation';
import validationMiddleware from '../../middlewares/validationMiddleware';
import { createAdminValidationSchema } from '../admin/admin.validation';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import authMiddleware from '../../middlewares/authMiddleware';
import { UserRole } from './user.constant';
import { changeStatusValidationSchema } from './user.validation';
import upload from '../../helper/upload';

const router = express.Router();

router.post(
  '/create-student',
  authMiddleware(UserRole.admin, UserRole.superAdmin),
  upload.single('image'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validationMiddleware(createStudentValidationSchema),
  createStudent,
);

router.post(
  '/create-admin',
  authMiddleware('superAdmin', 'admin'),
  upload.single('image'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validationMiddleware(createAdminValidationSchema),
  createAdmin,
);

router.post(
  '/create-faculty',
  authMiddleware('admin', 'superAdmin'),
  upload.single('image'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validationMiddleware(createFacultyValidationSchema),
  createFaculty,
);

router.get(
  '/get-all-users',
  authMiddleware(UserRole.admin, UserRole.superAdmin),
  getAllUsers,
);
router.get(
  '/get-single-user/:id',
  authMiddleware(UserRole.admin, UserRole.superAdmin),
  getSingleUser,
);
router.get(
  '/get-me',
  authMiddleware(
    UserRole.superAdmin,
    UserRole.admin,
    UserRole.faculty,
    UserRole.student,
  ),
  getMe,
);
router.patch(
  '/change-status/:id',
  authMiddleware('admin', 'superAdmin'),
  validationMiddleware(changeStatusValidationSchema),
  changeStatus,
);

router.post('/upload-image', upload.single('image'), uploadImage);

export const UserRoutes = router;
