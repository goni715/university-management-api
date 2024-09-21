import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcryptjs';
import config from '../../config';
import validator, { isTime } from 'validator';

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'Email is required'],
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not valid email',
      },
    },
    password: {
      type: String,
      required: [true, 'Password must be required'],
      minlength: [6, `Password must be minimum 6 characters`],
      maxlength: [20, `Password can't be more than 20 characters`],
      select:0
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: {
        values: ['superAdmin', 'student', 'faculty', 'admin'],
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
