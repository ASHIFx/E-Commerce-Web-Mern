import { Router } from "express";
import { admin } from "../middleware/adminMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import * as controller from "../controllers/orderController.js"

const orderRouter = Router();

orderRouter.route('/').post(protect, controller.addOrder).get(protect, admin, controller.getOrders);
orderRouter.route('/myorders').get(protect, controller.getMyOrders);
orderRouter.route('/:id/status').put(protect, admin, controller.updateOrderStatus);


export default orderRouter;