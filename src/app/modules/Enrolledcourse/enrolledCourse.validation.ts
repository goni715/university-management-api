import { z } from "zod";


export const createEnrolledCourseValidationSchma = z.object({
    offeredCourse: z.string()
})


