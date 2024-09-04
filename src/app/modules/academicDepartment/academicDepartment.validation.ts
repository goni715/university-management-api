import { z } from "zod";


const createAcademicDepartmentValidationSchema = z.object({
    name: z.string({
        invalid_type_error: "Academic Department must be string",
        required_error: 'Name is required'
    }),
    academicFaculty: z.string({
        invalid_type_error: "Academic Faculty must be string",
        required_error: 'Academic Faculty is required'
    })
})

const updateAcademicDepartmentValidationSchema = z.object({
    name: z.string({
        invalid_type_error: "Academic Department must be string",
        required_error: 'Name is required'
    }).optional(),
    academicFaculty: z.string({
        invalid_type_error: "Academic Faculty must be string",
        required_error: 'Academic Faculty is required'
    }).optional()
})



export {
    createAcademicDepartmentValidationSchema,
    updateAcademicDepartmentValidationSchema
}