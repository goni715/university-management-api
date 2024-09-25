import { TUserStatus } from "./user.interface";

export const UserRole = {
    student: 'student',
    faculty: 'faculty',
    admin: 'admin',
    superAdmin: 'superAdmin',
} as const;


export const UserStatus: TUserStatus[] = ['in-progress', 'blocked'];