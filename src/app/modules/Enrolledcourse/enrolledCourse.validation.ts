import { z } from "zod";


export const createEnrolledCourseValidationSchma = z.object({
    offeredCourse: z.string()
})


export const updateEnrolledCourseValidationSchema = z.object({
    semesterRegistration: z.string(),
    offeredCourse: z.string(),
    student: z.string(),
    courseMarks: z.object({
        classTest1: z.number(),
        midTerm: z.number(),
        classTest2: z.number(),
        finalTerm: z.number()
    })
})

