import express from 'express';
import { UserRoutes } from '../modules/user/user.route';


const router = express.Router();


const moduleRoutes = [
    {
        path: '/user',
        route: UserRoutes
    },
    // {
    //     path: '/student',
    //     route: StudentRoutes
    // }
]


moduleRoutes.forEach((item)=> router.use(item.path, item.route))


//router.use('/user', UserRoutes);
//router.use('/student', StudentRoutes);


export default router;