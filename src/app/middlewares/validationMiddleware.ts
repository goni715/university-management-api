import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validationMiddleware = (schema: AnyZodObject)=>{
    return async (req:Request, res:Response, next: NextFunction)=>{
        try{
            //validation check
            //if evertything allright next()--->
            const result = await schema.parseAsync(req.body);
            // console.log(result);
            next();
        }
        catch(err){
            //console.log('Validation error');
            next(err)
        }
    }
}


export default validationMiddleware;