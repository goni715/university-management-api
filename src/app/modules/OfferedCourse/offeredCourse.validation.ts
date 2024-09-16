import { z, ZodTypeAny } from 'zod';
import { Days } from './offeredCourse.constant';

const timeStringSchema = z.string().refine(
  (value) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
    return regex.test(value); //return true or false
  },
  {
    message: 'Invalid time format , expected "HH:MM" in 24 hours format',
  },
);

export const createOfferedCourseValidationSchema = z
  .object({
    semesterRegistration: z.string(),
    academicFaculty: z.string(),
    academicDepartment: z.string(),
    course: z.string(),
    faculty: z.string(),
    maxCapacity: z.number(),
    section: z.number(),
    days: z.array(z.enum([...Days] as [string, ...string[]])),
    startTime: timeStringSchema,
    endTime: timeStringSchema,
  })
  .refine(
    (values) => {
      const { startTime, endTime } = values;
      //startTime = 10:30  =>  2024-01-01T10:30:00
      //endTime = 12:30  =>  2024-01-01T12:30:00

      // Create Date objects using the provided startTime and endTime
      const start = new Date(`2024-01-01T${startTime}:00`);
      const end = new Date(`2024-01-01T${endTime}:00`);

      return end > start;
    },
    {
      message: 'Start time should be before End time !  ',
    },
  );

const updateOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      faculty: z.string(),
      maxCapacity: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: timeStringSchema, // HH: MM   00-23: 00-59
      endTime: timeStringSchema,
    })
    .refine(
      (body) => {
        // startTime : 10:30  => 1970-01-01T10:30
        //endTime : 12:30  =>  1970-01-01T12:30

        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);

        return end > start;
      },
      {
        message: 'Start time should be before End time !  ',
      },
    ),
});
