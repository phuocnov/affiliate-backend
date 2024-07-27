import mongoose, { Document, Model } from "mongoose";

export interface Shop extends Document {
  shop_id?: string;
  name: string;
  short_description: string;
  long_description: string;
  thumbnail_url: string;
  brand: string;
  category: string;
  ecommerce_site: string;
  affiliate_link: string;
  visit: number;
}

const shopSchema = new mongoose.Schema({
  shop_id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
  },
  short_description: {
    type: String,
    required: true,
  },
  long_description: {
    type: String,
    required: true,
  },
  thumbnail_url: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  ecommerce_site: {
    type: String,
    required: true,
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

const Shop: Model<Shop> = mongoose.model<Shop>("Shop", shopSchema);

export default Shop;
