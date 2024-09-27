import express from 'express';
import {
  deleteStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
} from './student.controller';
import validationMiddleware from '../../middlewares/validationMiddleware';
import { updateStudentValidationSchema } from './student.validation';
import authMiddleware from '../../middlewares/authMiddleware';

const router = express.Router();

router.get('/get-all-students', authMiddleware('admin', 'superAdmin'), getAllStudents);
router.get('/get-single-student/:id', authMiddleware('admin', 'superAdmin', 'faculty'), getSingleStudent);
router.patch(
  '/update-student/:id',
  authMiddleware('admin', 'superAdmin'),
  validationMiddleware(updateStudentValidationSchema),
  updateStudent,
);
router.delete('/delete-student/:id', authMiddleware('admin', 'superAdmin'), deleteStudent);

export const StudentRoutes = router;
