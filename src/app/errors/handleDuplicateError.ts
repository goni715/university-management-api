import { Error } from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: any) : TGenericErrorResponse =>{

    // Using regex to extract the value between escaped quotes
    // Extract value within double quotes using regex
   //const match = err.message.match(/"([^"]*)"/);
   // The extracted value will be in the first capturing group
   //const extractedMessage = match && match[1]; //output = Management

    const keyPattern = Object.keys(err.keyPattern)[0];
    const keyValue = err.keyValue[keyPattern]
  
    const errorSources: TErrorSources = [
        {
            path: keyPattern,
            message: `${keyValue} is already esisted`
        }
    ]

    const statusCode = 400;

    return {
      statusCode,
      message: 'Duplicate error',
      errorSources
    }

}

export default handleDuplicateError;