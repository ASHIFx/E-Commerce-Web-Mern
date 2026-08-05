import crypto from "crypto";
import razorpayInstance from "../config/razorpay.js";
import { config as appConfig } from "../config/config.js";

const isRazorpayConfigured = () => {
    return (
        appConfig.RAZORPAY_KEY_ID &&
        appConfig.RAZORPAY_KEY_SECRET &&
        appConfig.RAZORPAY_KEY_ID !== "your_key_id" &&
        appConfig.RAZORPAY_KEY_SECRET !== "your_key_secret"
    );
};

export async function createOrder(req, res) {
    try {
        const { amount } = req.body;
        const parsedAmount = Number(amount);

        if (!parsedAmount || parsedAmount <= 0) {
            return res.status(400).json({ message: "Invalid amount" });
        }

        if (!isRazorpayConfigured()) {
            return res.json({
                id: `bypass_order_${Date.now()}`,
                amount: Math.round(parsedAmount * 100),
                currency: "INR",
                bypass: true,
            });
        }

        const options = {
            amount: Math.round(parsedAmount * 100),
            currency: "INR",
        };

        const order = await razorpayInstance.orders.create(options);

        if (!order) return res.status(500).json({ message: "Some error occurred" });

        res.json(order);
    } catch (error) {
        console.error("Payment createOrder error:", error.message);
        return res.status(500).json({ message: error.message });
    }
}

export async function verifyPayment(req, res) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bypass } = req.body;

        if (!isRazorpayConfigured() || bypass) {
            return res.status(200).json({ message: "Payment verified successfully", bypass: true });
        }

        const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
        const expectedSign = crypto
            .createHmac("sha256", appConfig.RAZORPAY_KEY_SECRET)
            .update(sign)
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            return res.status(200).json({ message: "Payment verified successfully" });
        }

        return res.status(400).json({ message: "invalid signature sent!" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}