import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodEffects, ZodObject } from "zod";

//const validationMiddleware = (schema: AnyZodObject)=>{}

const validationMiddleware = (schema: ZodObject<any> | ZodEffects<any>)=>{
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