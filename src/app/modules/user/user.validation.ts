import { string, z } from "zod";
import { UserStatus } from "./user.constant";


const userValidationSchema = z.object({
    email: z.string().email({
        message: "Invalid email Address"
    }),
    password: z.string({
        invalid_type_error: "Password must be a string",
    })
    .max(20, {message: `Password can't be more than 20 characters`})
    .optional()
})


export const changeStatusValidationSchema = z.object({
    status: z.enum([...UserStatus] as [string, ...string[]])
})