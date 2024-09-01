import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';

const app: Application = express();


// parsers
app.use(express.json());
app.use(cors());


//application routes
//app.use('/api/v1/student', )
app.use('/api/v1/user', UserRoutes);


app.get('/', (req: Request, res: Response)=>{
    res.send('This is Home Page')
})


app.use('*', (req : Request, res : Response) => {
    res.status(404).json({status: false, message: "Route not found"})
})



export default app;