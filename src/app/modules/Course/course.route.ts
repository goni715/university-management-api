import express from "express";
import validationMiddleware from "../../middlewares/validationMiddleware";
import { createCourseValidationSchema, updateCourseValidationSchema } from "./course.validation";
import { createCourse, deleteCourse, getAllCourses, getSingleCourse } from "./course.controller";

const router = express.Router();



router.post('/create-course', validationMiddleware(createCourseValidationSchema), createCourse);
router.get('/get-all-courses', getAllCourses);
router.get('/get-single-course/:id', getSingleCourse);
// router.patch(
//   '/update-course/:id',
//   validationMiddleware(updateCourseValidationSchema),
//   updateCourse,
// );

router.delete('/delete-course/:id', deleteCourse);


export const CourseRoutes = router;