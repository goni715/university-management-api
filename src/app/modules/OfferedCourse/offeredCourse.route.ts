import express from 'express';
import { createOfferedCourse, updateOfferedCourse } from './offeredCourse.controller';
import validationMiddleware from '../../middlewares/validationMiddleware';
import { createOfferedCourseValidationSchema, updateOfferedCourseValidationSchema } from './offeredCourse.validation';

const router = express.Router();



router.post('/create-offered-course', validationMiddleware(createOfferedCourseValidationSchema), createOfferedCourse);
router.patch('/update-offered-course/:id', validationMiddleware(updateOfferedCourseValidationSchema), updateOfferedCourse);



const OfferedCourseRoutes = router;
export default OfferedCourseRoutes;