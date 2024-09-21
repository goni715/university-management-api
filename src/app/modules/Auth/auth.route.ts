import express from 'express';
import { changePassword, loginUser } from './auth.controller';
import validationMiddleware from './../../middlewares/validationMiddleware';
import { changePasswordValidationSchema, loginUserValidationSchema } from './auth.validation';
import authMiddleware from '../../middlewares/authMiddleware';
import { UserRole } from '../user/user.constant';


const router = express.Router();



router.post('/login', validationMiddleware(loginUserValidationSchema), loginUser);

router.patch('/change-password', authMiddleware(UserRole.admin, UserRole.student, UserRole.faculty, UserRole.superAdmin), validationMiddleware(changePasswordValidationSchema), changePassword);










const AuthRoutes = router;
export default AuthRoutes;