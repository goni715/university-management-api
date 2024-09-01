import { z } from 'zod';

// Custom validation function for capitalized format
const capitalizeValidator = (value : string) => {
  const formattedValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  if (value !== formattedValue) {
    throw new Error(`${value} must be in capitalize format`);
  }
  return value;
};

// Zod schema for TUserName
const userNameSchema = z.object({
  firstName: z
    .string()
    .max(20, "First Name can't be more than 20 characters")
    .trim()
    //.nonempty('First Name is required')
    .refine(capitalizeValidator, {
      message: 'First Name must be in capitalize format',
    }),
  middleName: z.string().max(20, "Middle Name can't be more than 20 characters").trim().optional(),
  lastName: z
    .string()
    .max(20, "Last Name can't be more than 20 characters")
    .trim()
    //.nonempty('Last Name is required')
    .refine(capitalizeValidator, {
      message: 'Last Name must be in capitalize format',
    })
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: 'Last Name must only contain alphabets',
    }),
});

// Zod schema for TGuardian
const guardianSchema = z.object({
  fatherName: z.string().trim(), //.nonempty('Father Name is required'),
  fatherOccupation: z.string().trim(), //.nonempty('Father Occupation is required'),
  fatherContactNo: z.string().trim(), //.nonempty('Father Contact No is required'),
  motherName: z.string().trim(), //.nonempty('Mother Name is required'),
  motherOccupation: z.string().trim(), //.nonempty('Mother Occupation is required'),
  motherContactNo: z.string().trim(), //.nonempty('Mother Contact No is required'),
});

// Zod schema for TStudent
const studentZodValidationSchema = z.object({
  id: z.string().trim().optional(),
  name: userNameSchema,
  email: z
    .string()
    .trim()
    // .nonempty('Email is required')
    .email({ message: 'Invalid email address' }),
  password: z.string().min(6).max(20),
 gender: z.enum(['male', 'female', 'others'], {
        errorMap: () => ({ message: '{VALUE} is not supported' }),
      }),
  
  dateOfBirth: z.string().trim().optional(),
 contactNo: z.string().trim(), //.nonempty('Contact Number is required'),
  emergencyContactNo: z.string().trim(), //.nonempty('Emergency Contact Number is required'),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
    errorMap: () => ({ message: '{VALUE} is not supported blood group' }),
  }).optional(),
  presentAddress: z.string().trim(), //.nonempty('Present Address is required'),
  permanentAddress: z.string().trim(), //.nonempty('Permanent Address is required'),
  guardian: guardianSchema,
  localGuardian: z.object({
    name: z.string().trim(), //.nonempty('Local Guardian Name is required'),
    occupation: z.string().trim(), //.nonempty('Local Guardian Occupation is required'),
    contactNo: z.string().trim(), //.nonempty('Local Guardian Contact Number is required'),
    address: z.string().trim(), //.nonempty('Local Guardian Address is required'),
  }),
  profileImg: z.string().trim().optional(),
  isActive: z.enum(['active', 'blocked'], {
    errorMap: () => ({ message: '{VALUE} is not supported' }),
  }).default('active'),
  isDeleted: z.boolean().default(false)
});

export default studentZodValidationSchema;
