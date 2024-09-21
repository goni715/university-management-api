import express from 'express';
import { changePassword, loginUser } from './auth.controller';
import validationMiddleware from './../../middlewares/validationMiddleware';
import { changePasswordValidationSchema, loginUserValidationSchema } from './auth.validation';


const router = express.Router();



router.post('/login', validationMiddleware(loginUserValidationSchema), loginUser);

router.patch('/change-password', validationMiddleware(changePasswordValidationSchema), changePassword);










const AuthRoutes = router;
export default AuthRoutes;