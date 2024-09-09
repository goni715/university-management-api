import express from 'express';
import { deleteAdmin, getAllAdmins, getSingleAdmin, updateAdmin } from './admin.controller';
import validationMiddleware from '../../middlewares/validationMiddleware';
import { updateAdminValidationSchema } from './admin.validation';

const router = express.Router();


router.get('/get-all-admins', getAllAdmins);
router.get('/get-single-admin/:id', getSingleAdmin);
router.patch('/update-admin/:id', validationMiddleware(updateAdminValidationSchema), updateAdmin);
router.delete('/delete-admin/:id', deleteAdmin);



export const AdminRoutes = router;