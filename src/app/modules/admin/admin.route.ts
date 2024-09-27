import express from 'express';
import { deleteAdmin, getAllAdmins, getSingleAdmin, updateAdmin } from './admin.controller';
import validationMiddleware from '../../middlewares/validationMiddleware';
import { updateAdminValidationSchema } from './admin.validation';
import authMiddleware from '../../middlewares/authMiddleware';
import { UserRole } from '../user/user.constant';

const router = express.Router();


router.get('/get-all-admins', authMiddleware(UserRole.superAdmin), getAllAdmins);
router.get('/get-single-admin/:id', authMiddleware(UserRole.superAdmin, UserRole.admin), getSingleAdmin);
router.patch('/update-admin/:id', authMiddleware(UserRole.superAdmin), validationMiddleware(updateAdminValidationSchema), updateAdmin);
router.delete('/delete-admin/:id', authMiddleware(UserRole.superAdmin), deleteAdmin);



export const AdminRoutes = router;