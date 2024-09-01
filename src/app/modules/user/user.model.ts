import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcryptjs';
import config from '../../config';

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password must be required'],
      minlength: [6, `Password must be minimum 6 characters`],
      maxlength: [20, `Password can't be more than 20 characters`],
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: {
        values: ['user', 'student', 'faculty', 'admin'],
        message: '{VALUE} is not valid',
      },
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);





//pre save middleware hook
userSchema.pre('save', async function (next) {
  const user = this; //this means data
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

//post save middleware hook
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});




const UserModel = model<TUser>('users', userSchema);

export default UserModel;
