import express from 'express';
import { createEnrolledCourse } from './enrolledCourse.controller';
import validationMiddleware from '../../middlewares/validationMiddleware';
import { createEnrolledCourseValidationSchma } from './enrolledCourse.validation';
import authMiddleware from '../../middlewares/authMiddleware';

const router = express.Router();


router.post('/create-enrolled-course', authMiddleware('student'), validationMiddleware(createEnrolledCourseValidationSchma), createEnrolledCourse);




const EnrolledCourseRoutes = router;
export default EnrolledCourseRoutes;