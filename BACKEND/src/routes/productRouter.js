import { Router } from "express";
import upload from "../middleware/uploadMIddleware.js";
import { admin } from "../middleware/adminMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import * as controller from "../controllers/productController.js";

const productRouter = Router();

productRouter.route('/').get(controller.getProducts).post(protect, admin, upload.single('image'), controller.createProduct);
productRouter.route('/:id').get(controller.getProductById).put(protect, admin, upload.single('image'), controller.updateProduct).delete(protect, admin, controller.deleteProduct);

export default productRouter