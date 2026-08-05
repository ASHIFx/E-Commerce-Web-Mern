import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    stock: {
      type: Boolean,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReview: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const productModel = new mongoose.model("Products", productSchema);

export default productModel;
