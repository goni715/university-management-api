import express from 'express';
import {
  deleteStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
} from './student.controller';
import validationMiddleware from '../../middlewares/validationMiddleware';
import { updateStudentValidationSchema } from './student.validation';

const router = express.Router();

router.get('/get-all-students', getAllStudents);
router.get('/get-single-student/:id', getSingleStudent);
router.patch(
  '/update-student/:id',
  validationMiddleware(updateStudentValidationSchema),
  updateStudent,
);
router.delete('/delete-student/:id', deleteStudent);

export const StudentRoutes = router;
