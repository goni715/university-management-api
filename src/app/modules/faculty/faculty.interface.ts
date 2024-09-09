import { Types } from "mongoose";

export type TGender = 'male' | 'female' | 'others';
export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';

export type TUserName = {
    firstName: string;
    middleName: string;
    lastName: string;
}


export type TFaculty = {
    id:string,
    user: Types.ObjectId,
    name: TUserName,
    designation: string;
    gender: 'male' | 'female' | 'others',
    dateOfBirth: Date;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    presentAddress: string;
    permanentAddress: string;
    profileImg: string;
    academicDepartment: Types.ObjectId,
    academicFaculty: Types.ObjectId,
    isDeleted: boolean;
}