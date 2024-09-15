import express from 'express';
import { createSemesterRegistration } from './semesterRegistration.controller';
import validationMiddleware from '../../middlewares/validationMiddleware';
import { createSemesterRegistrationValidationSchema } from './semesterRegistration.validation';

const router = express.Router();


router.post('/create-semester-registration', validationMiddleware(createSemesterRegistrationValidationSchema), createSemesterRegistration);


const SemesterRegistrationRoutes = router;
export default SemesterRegistrationRoutes;