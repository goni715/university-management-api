import express from 'express';
import { loginUser } from './auth.controller';
import validationMiddleware from './../../middlewares/validationMiddleware';
import { loginUserValidationSchema } from './auth.validation';


const router = express.Router();



router.post('/login', validationMiddleware(loginUserValidationSchema), loginUser);











const AuthRoutes = router;
export default AuthRoutes;