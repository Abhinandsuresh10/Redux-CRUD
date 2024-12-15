import express from 'express'
import { upload } from "../middleware/fileUpload.js";
import { authAdmin, getUsers, deleteUser, getSingleUser, editSingleUser, addSingleUser, adminLogout } from '../controllers/adminController.js';

const adminRouter = express.Router();


adminRouter.post('/login', authAdmin)
adminRouter.get('/users', getUsers)
adminRouter.delete('/delete-user/:userId', deleteUser)
adminRouter.get('/single-user/:userId', getSingleUser)
adminRouter.put('/edit-user/:userId',upload.single('image'), editSingleUser);
adminRouter.post('/add-user',upload.single('image'),addSingleUser)
adminRouter.post('/admin-logout', adminLogout)

export default adminRouter;