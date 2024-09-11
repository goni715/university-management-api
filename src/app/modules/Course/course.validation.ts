import { z } from "zod";

const preRequisiteCoursesValidationSchema = z.object({
    course: z.string().optional(),
    isDeleted: z.boolean().optional()
})


export const createCourseValidationSchema = z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    preRequisiteCourses: z.array(preRequisiteCoursesValidationSchema).optional(),
    isDeleted: z.boolean().optional()
})



//export const updateCourseValidationSchema = createCourseValidationSchema.partial()

export const updateCourseValidationSchema = z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    preRequisiteCourses: z.array(preRequisiteCoursesValidationSchema).optional(),
    isDeleted: z.boolean().optional()
})
