import { z } from "zod";
import { Days } from "./offeredCourse.constant";


export const createOfferedCourseValidationSchema = z.object({
    semesterRegistration: z.string(),
    academicFaculty: z.string(),
    academicDepartment: z.string(),
    course: z.string(),
    faculty: z.string(),
    maxCapacity: z.number(),
    section: z.number(),
    days: z.array(z.enum([...Days] as [string, ...string[]])),
    startTime: z.string(),
    endTime: z.string(),
})