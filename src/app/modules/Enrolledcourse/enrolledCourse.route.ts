import express from 'express';
import { createEnrolledCourse, getAllEnrolledCoursesOfFaculty, getMyEnrolledCourses, updateEnrolledCourseMarks } from './enrolledCourse.controller';
import validationMiddleware from '../../middlewares/validationMiddleware';
import { createEnrolledCourseValidationSchma, updateEnrolledCourseValidationSchema } from './enrolledCourse.validation';
import authMiddleware from '../../middlewares/authMiddleware';

const router = express.Router();


router.post('/create-enrolled-course', authMiddleware('student'), validationMiddleware(createEnrolledCourseValidationSchma), createEnrolledCourse);

router.patch('/update-enrolled-course-marks', authMiddleware('faculty', 'admin', 'superAdmin'), validationMiddleware(updateEnrolledCourseValidationSchema), updateEnrolledCourseMarks);

router.get(
    '/get-all-enrolled-courses-of-faculty',
    authMiddleware('faculty'),
    getAllEnrolledCoursesOfFaculty,
  );
  
  router.get(
    '/get-my-enrolled-courses',
    authMiddleware('student'),
    getMyEnrolledCourses,
  );


const EnrolledCourseRoutes = router;
export default EnrolledCourseRoutes;