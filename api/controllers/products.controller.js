import { imageUploadUtil } from "../helpers/cloudinary.js";
import Product from "../models/product.model.js";

export const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

// Add a New Product
export const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      productCode,
      description,
      category,
      brand,
      price,
      wholeSalePrice,
      salePrice,
      totalStock,
      // averageReview,
    } = req.body;

    // **Important:** Ensure stockHistory is set correctly, ignoring any incoming stockHistory from req.body
    const newlyCreatedProduct = new Product({
      image,
      title,
      productCode,
      description,
      category,
      brand,
      price: Number(price), // Ensure numeric fields are numbers
      wholeSalePrice: Number(wholeSalePrice),
      salePrice: Number(salePrice),
      totalStock: Number(totalStock),
      stockHistory: [
        {
          quantity: Number(totalStock), // Convert to Number to avoid type issues
          updatedAt: new Date(),
        },
      ],
      // averageReview,
    });

    await newlyCreatedProduct.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

//get all products

export const getAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//edit a product
export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      productCode,
      description,
      category,
      brand,
      price,
      wholeSalePrice,
      salePrice,
      totalStock,
      stockQuantity, // New stock quantity from the request
    } = req.body;

    let findProduct = await Product.findById(id);
    if (!findProduct)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    // Update other fields as needed
    findProduct.title = title || findProduct.title;
    findProduct.productCode = productCode || findProduct.productCode;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : Number(price) || findProduct.price;
    findProduct.wholeSalePrice =
      wholeSalePrice === "" || wholeSalePrice == null
        ? 0
        : Number(wholeSalePrice);

    findProduct.salePrice =
      salePrice === "" || salePrice == null ? 0 : Number(salePrice);

    findProduct.totalStock =
      totalStock !== undefined ? Number(totalStock) : findProduct.totalStock;
    findProduct.image = image || findProduct.image;
    findProduct.updatedAt = new Date();

    // In editProduct function
    if (stockQuantity !== undefined) {
      const quantityChange = Number(stockQuantity);
      findProduct.totalStock += quantityChange; // Adjust total stock based on the new quantity

      findProduct.stockHistory.push({
        quantity: quantityChange,
        updatedAt: new Date(),
      });
    }

    // Save the product with the updated stock history
    await findProduct.save();
    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

//delete a product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    res.status(200).json({
      success: true,
      message: "Product delete successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};
