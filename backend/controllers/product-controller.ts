import { Request, Response } from "express";
import asyncHandler from "../middleware/async-handler";
import Product from "../models/product-model";

// GET /api/products - Fetch all products
const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find({});
  console.log("products",products)
  res.json(products);
});

// GET /api/products/:id - Fetch product by ID
const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  }
  res.status(404);
  throw new Error('Product not found');
});

export { getProducts, getProductById };
