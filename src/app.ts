import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();


// parsers
app.use(express.json());
app.use(cors());


//application routes
//app.use('/api/v1/student', )
// app.use('/api/v1/user', UserRoutes);
app.use('/api/v1', router);


//Testing-Route- HomPage
app.get('/', (req: Request, res: Response)=>{
    res.send('This is Home Page')
})




//global error handler middleware
app.use(globalErrorHandler)

//not found middleware
app.use('*', notFound);



export default app;