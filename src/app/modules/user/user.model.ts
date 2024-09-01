import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';



const userSchema = new Schema<TUser>({
    id: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    needsPasswordChange: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: {
            values: ['user', 'student', 'faculty', 'admin'],
            message: '{VALUE} is not valid'
        }
    },
    status: {
        type:String,
        enum: ['in-progress', 'blocked'],
        default: 'in-progress'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
 },{
    timestamps: true,
    versionKey: false
 });



 const UserModel = model<TUser>('users', userSchema);

 export default UserModel;