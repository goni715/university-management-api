import { z } from "zod";

export const loginUserValidationSchema = z.object({
    id: z.string({
        required_error: 'Id is required !'
    }),
    password: z.string({
        required_error: 'Password is required !'
    }),
})