import { Router } from "express";
import * as controller from '../controllers/authController.js'
import { admin } from "../middleware/adminMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const authRouter = Router();

authRouter.post('/register', controller.register);
authRouter.post('/login', controller.login);
authRouter.post('/logout', protect, controller.logout);
authRouter.get('/register', protect, admin, controller.getUser);
authRouter.get('/profile', protect, controller.getProfile);
authRouter.post('/verify-email', controller.verifyUser);
authRouter.post('/verifyOtp', controller.verifyUser);
authRouter.post("/refreshToken", controller.refreshToken);

export default authRouter