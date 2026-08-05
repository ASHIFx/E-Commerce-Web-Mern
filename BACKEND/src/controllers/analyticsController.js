import { userModel } from "../model/userModel.js";
import { orderModel } from "../model/orderModel.js";
import productModel from "../model/productModel.js";

export async function getAdminStats(req, res) {
  try {
    const totalOrders = await orderModel.countDocuments({});
    const totalProducts = await productModel.countDocuments({});
    const totalUsers = await userModel.countDocuments({});

    const orders = await orderModel.find({});
    const totalRevenue = orders.reduce(
      (acc, item) => acc + item.totalAmount,
      0,
    );

    res.json({ totalOrders, totalProducts, totalRevenue, totalUsers });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
