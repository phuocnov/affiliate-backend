import mongoose, { Document, Model } from "mongoose";

export interface IBrand extends Document {
  code: string;
  desc: string;
}

const brandSchema = new mongoose.Schema({
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

const Brand: Model<IBrand> = mongoose.model<IBrand>("Brand", brandSchema);

export default Brand;
