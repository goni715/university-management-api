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
});


export const refreshTokenValidationSchema = z.object({
    refreshToken: z.string({
        required_error: 'Refresh token is required !'
    })
})



export const forgetPasswordValidationSchema = z.object({
    id: z.string({
        required_error: 'userId is required !'
    })
})



export const resetPasswordValidationSchema = z.object({
    id: z.string({
        required_error: 'userId is required !'
    }),
    newPassword: z.string({
        required_error: 'New Password is required !'
    }),
    token: z.string({
        required_error: 'Reset token is required !'
    }) 
})