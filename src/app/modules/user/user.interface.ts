export type TUser = {
    id: string;
    password: string;
    email: string;
    needsPasswordChange: boolean;
    role: 'superAdmin' | 'student' | 'admin' | 'faculty';
    status: 'in-progress' | 'blocked';
    isDeleted: boolean;
}


export type NewUser = {
    password: string;
    role: string;
    id: string;
}