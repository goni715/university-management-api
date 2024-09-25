import { z } from "zod";
import { BloodGroup, Gender } from "./admin.constant";


export const createUserNameValidationSchema = z.object({
    firstName: z.string(),
    middleName: z.string().optional(),
    lastName: z.string()
})



export const createAdminValidationSchema = z.object({
   password: z.string().optional(),
   adminData: z.object({
    name: createUserNameValidationSchema,
    email: z.string().email(),
    designation: z.string(),
    gender: z.enum([...Gender] as [string, ...string[]]),
    dateOfBirth: z.string(),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    bloodGroup: z.enum([...BloodGroup] as [string, ...string[]] ),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    profileImg: z.string().optional(),
   })
})



export const updateUserNameValidationSchema = z.object({
    firstName: z.string().optional(),
     middleName: z.string().optional(),
    lastName: z.string().optional()
})



export const updateAdminValidationSchema = z.object({
    name: updateUserNameValidationSchema,
    email: z.string().email().optional(),
    designation: z.string().optional(),
    gender: z.enum([...Gender] as [string, ...string[]]).optional(),
    dateOfBirth: z.string().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    bloodGroup: z.enum([...BloodGroup] as [string, ...string[]] ).optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    profileImg: z.string().optional(),
})