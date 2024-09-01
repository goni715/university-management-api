import express from "express"
import { createStudent } from "./user.controller";

const router = express.Router();

router.post('/create-student', createStudent);



export const UserRoutes= router;



