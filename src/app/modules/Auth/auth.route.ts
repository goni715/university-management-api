import express from 'express';
import { loginUser } from './auth.controller';


const router = express.Router();



router.post('/login-user', loginUser);











const AuthRoutes = router;
export default AuthRoutes;