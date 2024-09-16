import express from 'express';
import { createSemesterRegistration, getAllSemesterRegistrations, getSingleSemesterRegistration, updateSemesterRegistration } from './semesterRegistration.controller';
import validationMiddleware from '../../middlewares/validationMiddleware';
import { createSemesterRegistrationValidationSchema, updateSemesterRegistrationValidationSchema } from './semesterRegistration.validation';

const router = express.Router();


router.post('/create-semester-registration', validationMiddleware(createSemesterRegistrationValidationSchema), createSemesterRegistration);

router.get('/get-all-semester-registrations', getAllSemesterRegistrations);
router.get('/get-single-semester-registration/:id', getSingleSemesterRegistration);
router.patch('/update-semester-registration/:id', validationMiddleware(updateSemesterRegistrationValidationSchema), updateSemesterRegistration);




const SemesterRegistrationRoutes = router;
export default SemesterRegistrationRoutes;