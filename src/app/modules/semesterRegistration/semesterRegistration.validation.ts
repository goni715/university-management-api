import { z } from "zod";
import { SemesterRegistrationStatus } from "./semesterRegistration.constant";


export const createSemesterRegistrationValidationSchema = z.object({
    academicSemester: z.string(),
    status: z.enum([...SemesterRegistrationStatus] as [string, ...string[]]),
    startDate: z.string({
      required_error: "Select End Date",
    })
    .min(1, "Select End Date"),
    endDate: z.string({
      required_error: "Select End Date",
    })
    .min(1, "Select End Date"),
    minCredit: z.number(),
    maxCredit: z.number()
});


export const updateSemesterRegistrationValidationSchema = z.object({
    academicSemester: z.string().optional(),
    status: z.enum([...SemesterRegistrationStatus] as [string, ...string[]]).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional()
});