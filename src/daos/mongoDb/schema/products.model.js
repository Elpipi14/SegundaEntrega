import { Schema, model } from "mongoose";

export const productsCollection = "products";

const productsSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  status: { type: Boolean, required: true },
  code: { type: String, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
});

export const ProductsModel = model(productsCollection, productsSchema);