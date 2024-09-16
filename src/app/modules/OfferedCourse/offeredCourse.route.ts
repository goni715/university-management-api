import express from 'express';
import { createOfferedCourse } from './offeredCourse.controller';
import validationMiddleware from '../../middlewares/validationMiddleware';
import { createOfferedCourseValidationSchema } from './offeredCourse.validation';

const router = express.Router();



router.post('/create-offered-course', validationMiddleware(createOfferedCourseValidationSchema), createOfferedCourse);



const OfferedCourseRoutes = router;
export default OfferedCourseRoutes;