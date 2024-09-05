import { ErrorRequestHandler, NextFunction, Request, Response } from "express"
import { ZodError } from "zod";
import { TErrorSources } from "../interface/error";
import config from "../config";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/handleValidationError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next)=>{
//  const globalErrorHandler = (err:any, req: Request, res: Response, next: NextFunction)=>{


    let statusCode = err.statusCode || 500;
    let message = err?.message || 'Something Weng Wrong';




   let errorSources: TErrorSources = [
    {
        path: '',
        message: 'Something weng wrong'
    }
   ]



   if(err instanceof ZodError){
     const simplifiedError = handleZodError(err);
     statusCode = simplifiedError.statusCode;
     message = simplifiedError.message;
     errorSources = simplifiedError.errorSources;
   }
   else if(err?.name === 'ValidationError'){
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
   }




    return res.status(statusCode).json({
        success: false,
        message: message,
        errorSources,
        stack: config.Node_Env === 'development' ? err?.stack : null,
        error: err
    })
}

export default globalErrorHandler;