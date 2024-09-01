import { model, Schema } from 'mongoose';
import { IStudentModel, TGuardian, TStudent, TUserName } from './student.interface';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import config from '../../config';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    maxlength: [20, `First Name can't be more than 20 characters`],
    trim: true,
    validate: {
      validator: function (value: string) {
        const fNameStr =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        if (value !== fNameStr) {
          return false;
        } else {
          return true;
        }
      },
      message: '{VALUE} is not capitalize format',
    },
  },
  middleName: {
    type: String,
    trim: true,
    maxlength: [20, `First Name can't be more than 20 characters`],
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    maxlength: [20, `First Name can't be more than 20 characters`],
    trim: true,
    validate: [
      {
        validator: function (value: string) {
          const fNameStr =
            value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
          return value === fNameStr;
        },
        message: '{VALUE} is not capitalize format',
      },
      {
        validator: (value: string) => validator.isAlpha(value),
        message: '{VALUE} is not valid',
      },
    ],
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, 'Father Name is required'],
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Father Occupation is required'],
  },
  fatherContactNo: {
    type: String,
    trim: true,
    required: [true, 'Father Contact No is required'],
  },
  motherName: {
    type: String,
    trim: true,
    required: [true, 'Mother Name is required'],
  },
  motherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Mother Occupation is required'],
  },
  motherContactNo: {
    type: String,
    trim: true,
    required: [true, 'Father Contact No is required'],
  },
});


//for custom instance method
// const studentSchema = new Schema<TStudent, TStudentModel, TStudentMethods>({

//for custom static method
const studentSchema = new Schema<TStudent, IStudentModel>({
  id: { type: String, trim: true, unique: true },
  name: {
    type: userNameSchema,
    required: true,
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
  password:{
    type: String,
    required: [true, 'Password must be required'],
    minlength: [6, `Password must be minimum 6 characters`],
    maxlength: [20, `Password can't be more than 20 characters`],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'others'],
      message: '{VALUE} is not supported',
    },
  },
  dateOfBirth: {
    type: String,
    trim: true,
  },
  contactNo: {
    type: String,
    trim: true,
    required: [true, 'Contact Number is required'],
  },
  emergencyContactNo: {
    type: String,
    trim: true,
    required: [true, 'Emergency Contact Number is required'],
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', ' AB+', 'AB-', 'O+', 'O-'],
    required: [true, 'blood group is required!'],
  },
  presentAddress: {
    type: String,
    trim: true,
    required: [true, 'Present Address is required'],
  },
  permanentAddress: {
    type: String,
    trim: true,
    required: [true, 'Permanent Address is required'],
  },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: {
      name: {
        type: String,
        trim: true,
        required: [true, 'Local Guardian Name is required'],
      },
      occupation: {
        type: String,
        trim: true,
        required: [true, 'Local Guardian Occupation is required'],
      },
      contactNo: {
        type: String,
        trim: true,
        required: [true, 'Local Guardian Contact Number is required'],
      },
      address: {
        type: String,
        trim: true,
        required: [true, 'Local Guardian Address is required'],
      },
    },
    required: true,
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    default: 'active',
    enum: {
      values: ['active', 'blocked'],
      message: '{VALUE} is not supported',
    },
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
},
{
  timestamps: true,
  versionKey: false,
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
}
);


//virtuals
const virtual = studentSchema.virtual('fullName');
virtual.get(function(){
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
})


//pre save middleware hook
studentSchema.pre('save', async function(next) {
  const user = this; //this means data
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds))
  next();
});



//post save middleware hook
studentSchema.post('save', function(doc,next) {
  doc.password='';
  next();
});


studentSchema.pre('find', function(next){
  this.find({isDeleted: { $ne:true }});
  next()
})

studentSchema.pre('findOne', function(next){
  this.find({isDeleted: { $ne:true }});
  next()
})

studentSchema.pre('aggregate', function(next){
  this.pipeline().unshift({$match:{isDeleted: { $ne: true }}})
  next()
})





//creating a custom instance method
// studentSchema.methods.isUserExists = async function(id:string) {
//     const existingUser = await StudentModel.findOne({id:id});
//     return existingUser;
// }


//creating a custom static method
studentSchema.statics.isUserExists = async function(id:string) {
    const existingUser = await StudentModel.findOne({id:id});
    return existingUser;
}


//for instance method
//const StudentModel = model<TStudent, TStudentModel>('students', studentSchema);

//for static method
const StudentModel = model<TStudent, IStudentModel>('students', studentSchema);


export default StudentModel;
