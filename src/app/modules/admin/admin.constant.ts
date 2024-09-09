import { TBloodGroup, TGender } from "./admin.interface";

export const BloodGroup : TBloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const Gender: TGender[] = ['male', 'female'];

export const AdminSearchableFields = [
    'email',
    'id',
    'contactNo',
    'emergencyContactNo',
    'name.firstName',
    'name.lastName',
    'name.middleName',
  ];