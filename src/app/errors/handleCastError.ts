import { Error } from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleCastError = (err: Error.CastError) : TGenericErrorResponse =>{

    const errorSources: TErrorSources = [
        {
            path: err.path,
            message: err.message
        }
    ]

    const statusCode = 400;

    return {
      statusCode,
      message: 'Mongoose Cast error Invalid Id',
      errorSources
    }

}

export default handleCastError;