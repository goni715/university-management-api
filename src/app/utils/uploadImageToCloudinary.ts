import cloudinary from "../helper/cloudinary";
import fs from 'fs';



const uploadImageToCloudinary = async (path: string) => {
    
     // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
            path,{ 
             folder: "university"
            }
       )

       fs.unlinkSync(path);

    return uploadResult;

    
}


export default uploadImageToCloudinary;