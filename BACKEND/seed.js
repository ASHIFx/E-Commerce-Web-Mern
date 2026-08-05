import bcrypt from "bcryptjs";
import connectDB from "./src/config/database.js";
import { userModel } from "./src/model/userModel.js";
import productModel from "./src/model/productModel.js";
import { orderModel } from "./src/model/orderModel.js";

const seedDatabase = async () => {
  try {
    await connectDB();

    await Promise.all([
      userModel.deleteMany({}),
      productModel.deleteMany({}),
      orderModel.deleteMany({}),
    ]);

    const adminPassword = await bcrypt.hash("Admin@123", 10);
    const customerPassword = await bcrypt.hash("Customer@123", 10);

    const [adminUser, customerUser] = await Promise.all([
      userModel.create({
        username: "admin",
        email: "admin@shopnest.com",
        password: adminPassword,
        role: "admin",
        isVerified: true,
      }),
      userModel.create({
        username: "user",
        email: "user@shopnest.com",
        password: customerPassword,
        role: "user",
        isVerified: true,
      }),
    ]);

    const products = [
      {
        name: "Wireless Headphones",
        description: "Immersive sound with noise cancellation and 30-hour battery life.",
        price: 1299,
        category: "Electronics",
        stock: true,
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        rating: 4.8,
        numReview: 128,
      },
      {
        name: "Premium Leather Wallet",
        description: "Minimalist wallet crafted from genuine leather with RFID protection.",
        price: 899,
        category: "Fashion",
        stock: true,
        imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80",
        rating: 4.6,
        numReview: 74,
      },
      {
        name: "Smart Watch",
        description: "Track fitness, receive messages, and monitor health with a sleek design.",
        price: 2499,
        category: "Electronics",
        stock: true,
        imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
        rating: 4.7,
        numReview: 96,
      },
      {
        name: "Ceramic Coffee Mug",
        description: "Handcrafted ceramic mug with a cozy matte finish for daily use.",
        price: 499,
        category: "Home",
        stock: false,
        imageUrl: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80",
        rating: 4.3,
        numReview: 42,
      },
      {
        name: "Portable Bluetooth Speaker",
        description: "Compact and powerful speaker with deep bass and 12-hour playback.",
        price: 1799,
        category: "Electronics",
        stock: true,
        imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80",
        rating: 4.5,
        numReview: 63,
      },
      {
        name: "Organic Cotton T-Shirt",
        description: "Soft, breathable, and made for everyday comfort.",
        price: 699,
        category: "Fashion",
        stock: true,
        imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
        rating: 4.4,
        numReview: 88,
      },
    ];

    const createdProducts = await productModel.insertMany(products);

    const order = await orderModel.create({
      userId: customerUser._id,
      items: [
        {
          productId: createdProducts[0]._id,
          quantity: 2,
          price: createdProducts[0].price,
        },
      ],
      totalAmount: createdProducts[0].price * 2,
      address: {
        fullName: "John Doe",
        street: "12, Market Street",
        city: "Mumbai",
        postalCode: "400001",
        country: "India",
      },
      paymentId: "seed-payment-001",
      status: "Delivered",
    });

    console.log("✅ Database seeded successfully.");
    console.log({
      adminUser: adminUser.email,
      customerUser: customerUser.email,
      productsCreated: createdProducts.length,
      orderId: order._id,
    });
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    process.exit();
  }
};

seedDatabase();
