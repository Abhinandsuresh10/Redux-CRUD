import express from "express";
import { authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserPrfile} from "../controllers/userController.js";
import { upload } from "../middleware/fileUpload.js";

const userRouter = express.Router();

import { protect } from "../middleware/authMiddleware.js";

userRouter.post('/',upload.single('image'),registerUser)
userRouter.post('/auth', authUser)
userRouter.post('/logout', logoutUser)
userRouter.route('/profile').get(protect, getUserProfile).put(protect ,upload.single('image') , updateUserPrfile)


export default userRouter;