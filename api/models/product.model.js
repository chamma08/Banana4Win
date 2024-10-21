import mongoose from "mongoose";

const stockHistorySchema = new mongoose.Schema({
  quantity: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now },
});

const productSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    productCode: { type: String, unique: true },
    description: String,
    category: String,
    brand: String,
    price: Number,
    wholeSalePrice: Number,
    salePrice: Number,
    totalStock: Number,
    stockHistory: [stockHistorySchema],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
