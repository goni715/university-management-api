import { Types } from "mongoose";

export type TUserName = {
    firstName: string;
    middleName: string;
    lastName: string;
}


export type TAdmin = {
    id:string,
    user: Types.ObjectId,
    name: TUserName,
    designation: string;
    gender: 'male' | 'female' | 'others',
    dateOfBirth: Date;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloogGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    presentAddress: string;
    permanentAddress: string;
    profileImg: string;
    isDeleted: boolean;
}