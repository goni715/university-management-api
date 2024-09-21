import { z } from "zod";

export const loginUserValidationSchema = z.object({
    id: z.string({
        required_error: 'Id is required !'
    }),
    password: z.string({
        required_error: 'Password is required !'
    }),
})


export const changePasswordValidationSchema = z.object({
    oldPassword: z.string({
        required_error: 'oldPassword is required !'
    }).min(6, 'Old Password must be minimum 6 characters'),
    newPassword: z.string({
        required_error: 'newPassword is required !'
    }).min(6, 'New Password must be minimum 6 characters'),
})