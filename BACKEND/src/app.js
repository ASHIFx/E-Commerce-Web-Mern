import express from "express";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import productRouter from "./routes/productRouter.js";
import orderRouter from "./routes/orderRouter.js";
import paymentRouter from "./routes/paymentRouter.js";
import morgan from "morgan";
import analyticsRouter from "./routes/analyticsRouter.js";
import cookieParser from "cookie-parser";

const app = express();

// cors middelware --------------
app.use(cors({
    origin: [process.env.CLIENT_URL, "http://localhost:5173"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
}));

// express middleware -------------
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());


// routes ---------------------
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/analytics', analyticsRouter);

// universal error handler ---------------------
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ message: err.message });
});

export default app