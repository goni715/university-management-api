import express from 'express';
import validationMiddleware from '../../middlewares/validationMiddleware';
import { deleteFaculty, getAllFaculties, getSingleFaculty, updateFaculty } from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation';

const router = express.Router();


router.get('/get-all-faculties', getAllFaculties);
router.get('/get-single-faculty/:id', getSingleFaculty);
router.patch('/update-faculty/:id', validationMiddleware(updateFacultyValidationSchema), updateFaculty);
router.delete('/delete-faculty/:id', deleteFaculty);



export const FacultyRoutes = router;