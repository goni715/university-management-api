import express from 'express';
import validationMiddleware from '../../middlewares/validationMiddleware';
import { deleteFaculty, getAllFaculties, getSingleFaculty, updateFaculty } from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation';
import authMiddleware from '../../middlewares/authMiddleware';
import { UserRole } from '../user/user.constant';

const router = express.Router();


router.get('/get-all-faculties', authMiddleware(UserRole.admin, UserRole.superAdmin, UserRole.faculty), getAllFaculties);
router.get('/get-single-faculty/:id', authMiddleware(UserRole.admin, UserRole.superAdmin, UserRole.faculty), getSingleFaculty);
router.patch('/update-faculty/:id', authMiddleware(UserRole.admin, UserRole.superAdmin), validationMiddleware(updateFacultyValidationSchema), updateFaculty);
router.delete('/delete-faculty/:id', authMiddleware(UserRole.admin, UserRole.superAdmin), deleteFaculty);



export const FacultyRoutes = router;