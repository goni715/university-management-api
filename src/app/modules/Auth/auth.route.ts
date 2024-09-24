import express from 'express';
import { changePassword, forgetPassword, loginUser, refreshToken, resetPassword } from './auth.controller';
import validationMiddleware from './../../middlewares/validationMiddleware';
import { changePasswordValidationSchema, forgetPasswordValidationSchema, loginUserValidationSchema, refreshTokenValidationSchema, resetPasswordValidationSchema } from './auth.validation';
import authMiddleware from '../../middlewares/authMiddleware';
import { UserRole } from '../user/user.constant';


const router = express.Router();



router.post('/login', validationMiddleware(loginUserValidationSchema), loginUser);

router.patch('/change-password', authMiddleware(UserRole.admin, UserRole.student, UserRole.faculty, UserRole.superAdmin), validationMiddleware(changePasswordValidationSchema), changePassword);

router.post('/refresh-token', validationMiddleware(refreshTokenValidationSchema), refreshToken);
router.post('/forget-password', validationMiddleware(forgetPasswordValidationSchema), forgetPassword);
router.patch('/reset-password', validationMiddleware(resetPasswordValidationSchema), resetPassword);







const AuthRoutes = router;
export default AuthRoutes;