import { TSemesterRegistrationStatus } from "./semesterRegistration.interface";

export const SemesterRegistrationStatus : TSemesterRegistrationStatus[] = ['UPCOMING', 'ONGOING', 'ENDED'];

export const RegistrationStatus = {
    UPCOMING: 'UPCOMING',
    ONGOING : 'ONGOING',
    ENDED: 'ENDED'
} as const;