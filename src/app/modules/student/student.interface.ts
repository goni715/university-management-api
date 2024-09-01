import { Model } from 'mongoose';

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export interface TStudent {
  id: string;
  name: TUserName;
  email: string;
  password: string;
  gender: 'male' | 'female' | 'others'; //union literal type
  dateOfBirth?: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | ' AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  isActive: 'active' | 'blocked';
  isDeleted: boolean;
}

//for creating a custom instance method
// export interface TStudentMethods {
//   isUserExists(id:string): Promise<TStudent | null>
// }

// Create a new Model type that knows about IUserMethods...
//export type TStudentModel = Model<TStudent, Record<string, never>, TStudentMethods>;

//for creating a static model
export interface IStudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}
