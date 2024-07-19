import mongoose, { Document, Model, ObjectId } from "mongoose";

export interface IProduct extends Document {
  product_id: string;
  shop_id: string;
  short_url: string;
  price: number;
  original_price: number;
  rating_average: number;
  review_count: number;
  all_time_quantity_sold: number;
  thumbnail_url: string;
  brand: ObjectId;
  category: ObjectId;
  ecommerce_site: ObjectId;
  affiliate_link: string;
  visit: number;
}

const productSchema = new mongoose.Schema({
  product_id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  shop_id: {
    type: String,
    required: true,
  },
  short_url: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  original_price: {
    type: Number,
    required: true,
  },
  rating_average: {
    type: Number,
    required: true,
  },
  review_count: {
    type: Number,
    required: true,
  },
  all_time_quantity_sold: {
    type: Number,
    required: true,
  },
  thumbnail_url: {
    type: String,
    required: true,
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  ecommerce_site: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EcommerceSite",
  },
  affiliate_link: {
    type: String,
    required: true,
  },
  visit: {
    type: Number,
    required: true,
  },
});

const Product: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  productSchema
);

export default Product;
