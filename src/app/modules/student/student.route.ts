import express from 'express';
import {
  deleteStudent,
  getAllStudents,
  getSingleStudent,
} from './student.controller';

const router = express.Router();


router.get('/get-all-students', getAllStudents);
router.get('/get-single-student/:studentId', getSingleStudent);
router.delete('/delete-student/:studentId', deleteStudent);

export const StudentRoutes = router;
