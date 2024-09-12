import express from 'express';
import validationMiddleware from '../../middlewares/validationMiddleware';
import {
  facultiesWithCourseValidationSchema,
  createCourseValidationSchema,
  updateCourseValidationSchema,
} from './course.validation';
import {
  assignCourseFaculties,
  createCourse,
  deleteCourse,
  getAllCourseFaculties,
  getAllCourses,
  getSingleCourse,
  removeFacultiesFromCourse,
  updateCourse,
} from './course.controller';

const router = express.Router();

router.post(
  '/create-course',
  validationMiddleware(createCourseValidationSchema),
  createCourse,
);
router.get('/get-all-courses', getAllCourses);
router.get('/get-single-course/:id', getSingleCourse);
router.patch(
  '/update-course/:id',
  validationMiddleware(updateCourseValidationSchema),
  updateCourse,
);

router.delete('/delete-course/:id', deleteCourse);

router.put('/assign-faculties-with-course/:courseId', validationMiddleware(facultiesWithCourseValidationSchema), assignCourseFaculties);

router.delete('/remove-faculties-from-course/:courseId', validationMiddleware(facultiesWithCourseValidationSchema),  removeFacultiesFromCourse);

router.get('/get-all-course-faculties', getAllCourseFaculties);



export const CourseRoutes = router;
