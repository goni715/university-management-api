import express from 'express';
import { createSemesterRegistration, getAllSemesterRegistrations, getSingleSemesterRegistration } from './semesterRegistration.controller';
import validationMiddleware from '../../middlewares/validationMiddleware';
import { createSemesterRegistrationValidationSchema } from './semesterRegistration.validation';

const router = express.Router();


router.post('/create-semester-registration', validationMiddleware(createSemesterRegistrationValidationSchema), createSemesterRegistration);

router.get('/get-all-semester-registrations', getAllSemesterRegistrations);
router.get('/get-single-semester-registration/:id', getSingleSemesterRegistration);


const SemesterRegistrationRoutes = router;
export default SemesterRegistrationRoutes;