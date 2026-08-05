import { orderModel } from "../model/orderModel.js";
import sendEmail from "../utils/sendEmail.js";

export async function addOrder(req, res) {
  try {
    const { items, totalAmount, address, paymentId } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }
    const createOrder = await orderModel.create({
      userId: req.user._id,
      items,
      totalAmount,
      address,
      paymentId,
    });

    const message = `
            <h2>Order Confirmation</h2>
            <p>Hello ${req.user.username},</p>
            <p>Your order has been successfully placed! Order ID: <strong>${createOrder._id}</strong></p>
            <p>Total Amount Paid: $${totalAmount.toFixed(2)}</p>
            <p>It will be shipped to: ${address.street}, ${address.city}</p>
            <p>Thank you for shopping with ShopNest!</p>
            `;

    await sendEmail({
      email: req.user.email,
      subject: "ShopNest - Order Confirmation",
      message,
    });

    return res.status(201).json(createOrder);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
export async function getMyOrders(req, res) {
  try {
    const orders = await orderModel.find({ userId: req.user._id });
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getOrders(req, res) {
  try {
    const orders = await orderModel.find({}).populate("userId", " id username");
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function updateOrderStatus(req, res) {
  try {
    const order = await orderModel.findById(req.params.id);
    if (order) {
      order.status = req.body.status || order.status;
      const updatedOrder = await order.save();
      return res.json(updatedOrder);
    } else {
      return res.status(404).json({ message: "order not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
