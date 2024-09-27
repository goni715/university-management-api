import express from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import { UserRole } from '../user/user.constant';
import validationMiddleware from '../../middlewares/validationMiddleware';
import { facultiesWithCourseValidationSchema } from '../Course/course.validation';
import { assignCourseFaculties, getAllCourseFaculties, getFacuctiesWithCourse, removeFacultiesFromCourse } from './courseFaculty.controller';

const router = express.Router()


router.put('/assign-faculties-with-course/:courseId',  authMiddleware(UserRole.admin, UserRole.superAdmin), validationMiddleware(facultiesWithCourseValidationSchema), assignCourseFaculties);

router.delete('/remove-faculties-from-course/:courseId',  authMiddleware(UserRole.admin, UserRole.superAdmin), validationMiddleware(facultiesWithCourseValidationSchema),  removeFacultiesFromCourse);

router.get('/get-all-course-faculties', authMiddleware(UserRole.admin, UserRole.superAdmin, UserRole.faculty, UserRole.student), getAllCourseFaculties);

router.get('/get-faculties-with-course/:courseId', authMiddleware(UserRole.admin, UserRole.superAdmin, UserRole.faculty, UserRole.student), getFacuctiesWithCourse);


const CourseFacultyRoutes = router;
export default CourseFacultyRoutes;
