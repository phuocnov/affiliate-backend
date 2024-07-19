import mongoose, { Document, Model } from "mongoose";

export interface ICategory extends Document {
  code: string;
  desc: string;
}

const categorySchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  desc: {
    type: String,
    required: true,
  },
});

const Category: Model<ICategory> = mongoose.model<ICategory>(
  "Category",
  categorySchema
);

export default Category;
