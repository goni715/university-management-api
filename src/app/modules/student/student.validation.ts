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
const createUserNameValidationSchema = z.object({
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
const createGuardianValidationSchema = z.object({
  fatherName: z.string().trim(), 
  fatherOccupation: z.string().trim(),
  fatherContactNo: z.string().trim(),
  motherName: z.string().trim(), 
  motherOccupation: z.string().trim(), 
  motherContactNo: z.string().trim(), 
});


const createLocalGuardianValidationSchema = z.object({
  name: z.string().trim(), 
  occupation: z.string().trim(),
  contactNo: z.string().trim(), 
  address: z.string().trim(),
})







// Zod schema for TStudent
const createStudentValidationSchema = z.object({
  password: z.string().min(6).max(20),
  studentData: z.object({
    name: createUserNameValidationSchema,
    email: z
      .string()
      .trim()
      // .nonempty('Email is required')
      .email({ message: 'Invalid email address' }),

    gender: z.enum(['male', 'female', 'others'], {
      errorMap: () => ({ message: '{VALUE} is not supported' }),
    }),
    dateOfBirth: z.string().optional(),
    contactNo: z.string().trim(), //.nonempty('Contact Number is required'),
    emergencyContactNo: z.string().trim(), //.nonempty('Emergency Contact Number is required'),
    bloodGroup: z
      .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
        errorMap: () => ({ message: '{VALUE} is not supported blood group' }),
      })
      .optional(),
    presentAddress: z.string().trim(), //.nonempty('Present Address is required'),
    permanentAddress: z.string().trim(), //.nonempty('Permanent Address is required'),
    guardian: createGuardianValidationSchema,
    localGuardian: createLocalGuardianValidationSchema,
    admissionSemester: z.string(),
    academicDepartment: z.string(),
    profileImg: z.string().trim().optional(),
  }),

});





// Zod schema for TUserName
const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, "First Name can't be more than 20 characters")
    .trim()
    //.nonempty('First Name is required')
    .refine(capitalizeValidator, {
      message: 'First Name must be in capitalize format',
    }).optional(),
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
    }).optional(),
}).optional();

// Zod schema for TGuardian
const updateGuardianValidationSchema = z.object({
  fatherName: z.string().trim().optional(), 
  fatherOccupation: z.string().trim().optional(),
  fatherContactNo: z.string().trim().optional(),
  motherName: z.string().trim().optional(), 
  motherOccupation: z.string().trim().optional(), 
  motherContactNo: z.string().trim().optional(), 
}).optional();


const updateLocalGuardianValidationSchema = z.object({
  name: z.string().trim().optional(), 
  occupation: z.string().trim().optional(),
  contactNo: z.string().trim().optional(), 
  address: z.string().trim().optional(),
}).optional()







// Zod schema for TStudent
const updateStudentValidationSchema = z.object({
    name: updateUserNameValidationSchema,
    email: z
      .string()
      .trim()
      // .nonempty('Email is required')
      .email({ message: 'Invalid email address' }).optional(),

    gender: z.enum(['male', 'female', 'others'], {
      errorMap: () => ({ message: '{VALUE} is not supported' }),
    }).optional(),
    dateOfBirth: z.string().optional(),
    contactNo: z.string().trim().optional(), //.nonempty('Contact Number is required'),
    emergencyContactNo: z.string().trim().optional(), //.nonempty('Emergency Contact Number is required'),
    bloodGroup: z
      .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
        errorMap: () => ({ message: '{VALUE} is not supported blood group' }),
      })
      .optional(),
    presentAddress: z.string().trim().optional(), //.nonempty('Present Address is required'),
    permanentAddress: z.string().trim().optional(), //.nonempty('Permanent Address is required'),
    guardian: updateGuardianValidationSchema,
    localGuardian: updateLocalGuardianValidationSchema,
    admissionSemester: z.string().optional(),
    academicDepartment: z.string().optional(),
    profileImg: z.string().trim().optional().optional(),
});








export {
  createStudentValidationSchema,
  updateStudentValidationSchema
};
