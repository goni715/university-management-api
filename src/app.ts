import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();


// parsers
app.use(express.json());
app.use(cors());


app.get('/', (req: Request, res: Response)=>{
    res.send('This is Home Page')
})


app.use('*', (req : Request, res : Response) => {
    res.status(404).json({status: false, message: "Route not found"})
})



export default app;