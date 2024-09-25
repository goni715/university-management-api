import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });


export default {
    Node_Env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    default_password: process.env.DEFAULT_PASS,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPRESS_IN,
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPRESS_IN,
    smtp_username: process.env.SMTP_USERNAME,
    smtp_password: process.env.SMTP_PASSWORD,
    smtp_from: process.env.SMTP_FROM,
    reset_password_ui_link: process.env.RESET_PASSWORD_UI_LINK,
    cloud_name : process.env.CLOUD_NAME,
    cloud_api_key : process.env.CLOUD_API_KEY,
    cloud_api_secret: process.env.CLOUD_API_SECRET
}
