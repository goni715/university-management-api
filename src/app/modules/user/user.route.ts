import express from 'express';
import { createAdmin, createFaculty, createStudent, getAllUsers, getSingleUser } from './user.controller';
import { createStudentValidationSchema } from '../student/student.validation';
import validationMiddleware from '../../middlewares/validationMiddleware';
import { createAdminValidationSchema } from '../admin/admin.validation';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';

const router = express.Router();

router.post(
  '/create-student',
  validationMiddleware(createStudentValidationSchema),
  createStudent,
);

router.post(
  '/create-admin',
  validationMiddleware(createAdminValidationSchema),
  createAdmin
);

router.post(
  '/create-faculty',
  validationMiddleware(createFacultyValidationSchema),
  createFaculty
);


router.get('/get-all-users',getAllUsers);
router.get('/get-single-user/:id', getSingleUser);



export const UserRoutes = router;
