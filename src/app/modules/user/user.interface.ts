import { UserRole } from './user.constant';

export type TUserStatus = 'in-progress' | 'blocked';

export type TUser = {
  id: string;
  password: string;
  email: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  role: 'superAdmin' | 'student' | 'admin' | 'faculty';
  status: TUserStatus;
  isDeleted: boolean;
};

export type NewUser = {
  password: string;
  role: string;
  id: string;
};

export type TUserRole = keyof typeof UserRole;
