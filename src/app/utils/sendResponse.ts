import { Response } from "express";

type TMeta = {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
}

type TResponseData<T> = {
    statusCode:number;
    status: boolean;
    message?: string;
    meta?: TMeta;
    data:T
}


// const sendResponse = <T>( res:Response, data: {statusCode:number; status: boolean; message?: string; data:T}) => {

const sendResponse = <T>( res:Response, data: TResponseData<T> ) => {
    
    res.status(data?.statusCode).json({
        success:data?.status, 
        message: data?.message,
        meta: data.meta,
        data: data?.data
    });
}

export default sendResponse;