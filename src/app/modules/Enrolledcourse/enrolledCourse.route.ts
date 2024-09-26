import express from 'express';
import { createEnrolledCourse, updateEnrolledCourseMarks } from './enrolledCourse.controller';
import validationMiddleware from '../../middlewares/validationMiddleware';
import { createEnrolledCourseValidationSchma, updateEnrolledCourseValidationSchema } from './enrolledCourse.validation';
import authMiddleware from '../../middlewares/authMiddleware';

const router = express.Router();


router.post('/create-enrolled-course', authMiddleware('student'), validationMiddleware(createEnrolledCourseValidationSchma), createEnrolledCourse);

router.patch('/update-enrolled-course-marks', authMiddleware('faculty'), validationMiddleware(updateEnrolledCourseValidationSchema), updateEnrolledCourseMarks);



const EnrolledCourseRoutes = router;
export default EnrolledCourseRoutes;