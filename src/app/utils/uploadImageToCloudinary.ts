import cloudinary from "../helper/cloudinary";



const uploadImageToCloudinary = async () => {
    
     // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               folder: "university"
           }
       )

    return uploadResult;

    
}


export default uploadImageToCloudinary;