import { Response } from "express";

type TResponseData<T> = {
    statusCode:number;
    status: boolean;
    message?: string;
    data:T
}


// const sendResponse = <T>( res:Response, data: {statusCode:number; status: boolean; message?: string; data:T}) => {

const sendResponse = <T>( res:Response, data: TResponseData<T> ) => {
    
    res.status(data?.statusCode).json({
        success:data?.status, 
        message: data?.message,
        data: data?.data
    });
}

export default sendResponse;