import express from 'express';
import { createSemesterRegistration, deleteSemesterRegistration, getAllSemesterRegistrations, getSingleSemesterRegistration, updateSemesterRegistration } from './semesterRegistration.controller';
import validationMiddleware from '../../middlewares/validationMiddleware';
import { createSemesterRegistrationValidationSchema, updateSemesterRegistrationValidationSchema } from './semesterRegistration.validation';
import authMiddleware from '../../middlewares/authMiddleware';
import { UserRole } from '../user/user.constant';

const router = express.Router();


router.post('/create-semester-registration', authMiddleware(UserRole.admin, UserRole.superAdmin), validationMiddleware(createSemesterRegistrationValidationSchema), createSemesterRegistration);

router.get('/get-all-semester-registrations', authMiddleware(UserRole.admin, UserRole.superAdmin, UserRole.faculty, UserRole.student), getAllSemesterRegistrations);
router.get('/get-single-semester-registration/:id', authMiddleware(UserRole.admin, UserRole.superAdmin, UserRole.faculty, UserRole.student), getSingleSemesterRegistration);
router.patch('/update-semester-registration/:id', authMiddleware(UserRole.admin, UserRole.superAdmin), validationMiddleware(updateSemesterRegistrationValidationSchema), updateSemesterRegistration);
router.delete('/delete-semester-registration/:id', authMiddleware(UserRole.admin, UserRole.superAdmin), deleteSemesterRegistration);



const SemesterRegistrationRoutes = router;
export default SemesterRegistrationRoutes;