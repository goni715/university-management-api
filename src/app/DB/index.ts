import config from "../config";
import { hashedPassword } from "../modules/Auth/auth.utils";
import UserModel from "../modules/user/user.model";

const superUser = {
    id: 'SA-0001',
    password: config.super_admin_password, //it will be hash using pre save hook
    email: 'superadmin@gmail.com',
    needsPasswordChange: false,
    role: 'superAdmin',
    status: 'in-progress'
}


const seedSuperAdmin = async () => {
    //when databse is connected, we will check is there any user who is super admin
    const isSuperAdminExists = await UserModel.findOne({role: 'superAdmin'});

    //check if there is no superAdmin
    if(!isSuperAdminExists){
        await UserModel.create(superUser);
    }
}


export default seedSuperAdmin;