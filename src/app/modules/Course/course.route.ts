import express from 'express';
import validationMiddleware from '../../middlewares/validationMiddleware';
import {
  facultiesWithCourseValidationSchema,
  createCourseValidationSchema,
  updateCourseValidationSchema,
} from './course.validation';
import {
  assignCourseFaculties,
  createCourse,
  deleteCourse,
  getAllCourseFaculties,
  getAllCourses,
  getSingleCourse,
  removeFacultiesFromCourse,
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

router.put('/assign-faculties-with-course/:courseId',  authMiddleware(UserRole.admin, UserRole.superAdmin), validationMiddleware(facultiesWithCourseValidationSchema), assignCourseFaculties);

router.delete('/remove-faculties-from-course/:courseId',  authMiddleware(UserRole.admin, UserRole.superAdmin), validationMiddleware(facultiesWithCourseValidationSchema),  removeFacultiesFromCourse);

router.get('/get-all-course-faculties', authMiddleware(UserRole.admin, UserRole.superAdmin, UserRole.faculty, UserRole.student), getAllCourseFaculties);



export const CourseRoutes = router;
