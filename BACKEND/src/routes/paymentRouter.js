import { Router } from "express";
import { createOrder, verifyPayment } from "../controllers/paymentController.js";

const paymentRouter = Router();

paymentRouter.post('/order', createOrder);
paymentRouter.post('/verify', verifyPayment);

export default paymentRouter;