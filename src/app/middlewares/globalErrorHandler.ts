import { NextFunction, Request, Response } from "express"

const globalErrorHandler = (err:any, req: Request, res: Response, next: NextFunction)=>{

    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
        success: false,
        message: err.message || 'Something Weng Wrong',
        error: err
    })
}

export default globalErrorHandler;