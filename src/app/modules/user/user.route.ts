import express from "express"
import { createStudent } from "./user.controller";
import { createStudentValidationSchema } from "../student/student.validation";
import validationMiddleware from "../../middlewares/validationMiddleware";

const router = express.Router();


router.post('/create-student', validationMiddleware(createStudentValidationSchema), createStudent);



export const UserRoutes= router;



