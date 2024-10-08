import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { StudentRoutes } from '../modules/student/student.route';
import { AcademicSemesterRoutes } from './../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from './../modules/academicFaculty/acdemicFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { FacultyRoutes } from '../modules/faculty/faculty.route';
import { CourseRoutes } from '../modules/Course/course.route';
import SemesterRegistrationRoutes from '../modules/semesterRegistration/semesterRegistration.route';
import OfferedCourseRoutes from '../modules/OfferedCourse/offeredCourse.route';
import AuthRoutes from '../modules/Auth/auth.route';
import EnrolledCourseRoutes from '../modules/Enrolledcourse/enrolledCourse.route';
import CourseFacultyRoutes from '../modules/CourseFaculty/courseFaculty.route';


const router = express.Router();


const moduleRoutes = [
    {
        path: '/user',
        route: UserRoutes
    },
    {
        path: '/student',
        route: StudentRoutes
    },
    {
        path: '/admin',
        route: AdminRoutes
    },
    {
        path: '/academic-semester',
        route: AcademicSemesterRoutes
    },
    {
        path: '/academic-faculty',
        route: AcademicFacultyRoutes
    },
    {
        path: '/academic-department',
        route: AcademicDepartmentRoutes
    },
    {
        path: '/faculty',
        route: FacultyRoutes
    },
    {
        path: '/course',
        route: CourseRoutes
    },
    {
        path: '/course-faculty',
        route: CourseFacultyRoutes
    },
    {
        path: '/semester-registration',
        route: SemesterRegistrationRoutes
    },
    {
        path: '/offered-course',
        route: OfferedCourseRoutes
    },
    {
        path: '/auth',
        route: AuthRoutes
    },
    {
        path: '/enrolled-course',
        route: EnrolledCourseRoutes
    }
]


moduleRoutes.forEach((item)=> router.use(item.path, item.route))


//router.use('/user', UserRoutes);
//router.use('/student', StudentRoutes);


export default router;