import bcrypt from 'bcryptjs';
import config from '../../config';


export const checkPassword = async (plainTextPass: string, hashPassword: string) => {
    return await bcrypt.compare(plainTextPass, hashPassword);
}


export const hashedPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(Number(config.bcrypt_salt_rounds));
    return await bcrypt.hash(password, salt); //hashedPassword
}
