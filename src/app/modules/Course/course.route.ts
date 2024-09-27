import express from 'express';
import validationMiddleware from '../../middlewares/validationMiddleware';
import {
  createCourseValidationSchema,
  updateCourseValidationSchema,
} from './course.validation';
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
} from './course.controller';
import authMiddleware from '../../middlewares/authMiddleware';
import { UserRole } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-course',
  authMiddleware(UserRole.admin, UserRole.superAdmin),
  validationMiddleware(createCourseValidationSchema),
  createCourse,
);

router.get('/get-all-courses', authMiddleware(UserRole.admin, UserRole.superAdmin, UserRole.faculty, UserRole.student), getAllCourses);
router.get('/get-single-course/:id',  authMiddleware(UserRole.admin, UserRole.superAdmin, UserRole.faculty, UserRole.student), getSingleCourse);
router.patch(
  '/update-course/:id',
  authMiddleware(UserRole.admin, UserRole.superAdmin),
  validationMiddleware(updateCourseValidationSchema),
  updateCourse,
);

router.delete('/delete-course/:id',  authMiddleware(UserRole.admin, UserRole.superAdmin), deleteCourse);



export const CourseRoutes = router;
