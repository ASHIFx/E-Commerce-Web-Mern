import { Router } from "express";
import { admin } from "../middleware/adminMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import { getAdminStats } from "../controllers/analyticsController.js";

const analyticsRouter = Router();

analyticsRouter.get('/',protect, admin, getAdminStats);

export default analyticsRouter;