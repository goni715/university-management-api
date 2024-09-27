import express from 'express';
import { createOfferedCourse, getAllOfferedCourses, getMyOfferedCourses, getSingleOfferedCourse, updateOfferedCourse } from './offeredCourse.controller';
import validationMiddleware from '../../middlewares/validationMiddleware';
import { createOfferedCourseValidationSchema, updateOfferedCourseValidationSchema } from './offeredCourse.validation';
import authMiddleware from '../../middlewares/authMiddleware';
import { UserRole } from '../user/user.constant';

const router = express.Router();



router.post('/create-offered-course', validationMiddleware(createOfferedCourseValidationSchema), createOfferedCourse);
router.get('/get-all-offered-courses', authMiddleware(UserRole.admin, UserRole.superAdmin, UserRole.faculty), getAllOfferedCourses);
router.get('/get-my-offered-courses', authMiddleware(UserRole.student), getMyOfferedCourses);

router.get('/get-single-offered-course/:id', authMiddleware(UserRole.admin, UserRole.superAdmin, UserRole.faculty, UserRole.student), getSingleOfferedCourse);
router.patch('/update-offered-course/:id', authMiddleware(UserRole.admin, UserRole.superAdmin), validationMiddleware(updateOfferedCourseValidationSchema), updateOfferedCourse);



const OfferedCourseRoutes = router;
export default OfferedCourseRoutes;