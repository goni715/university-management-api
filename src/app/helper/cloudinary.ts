import { v2 as cloudinary } from 'cloudinary';
import config from '../config';

//cloudinary Configuration
cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.cloud_api_key,
  api_secret: config.cloud_api_secret, // Click 'View API Keys' above to copy your API secret
});


export default cloudinary;