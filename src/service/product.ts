import Product, { IProduct } from "../models/product";

export interface ProductDTO {
  product_id?: string;
  shop_id?: string;
  short_url?: string;
  price?: number;
  original_price?: number;
  rating_average?: number;
  review_count?: number;
  all_time_quantity_sold?: number;
  thumbnail_url?: string;
  brand?: string;
  category?: string;
  ecommerce_site?: string;
  affiliate_link?: string;
  visit?: number;
}

export const createProduct = async ({
  product_id,
  shop_id,
  short_url,
  price,
  original_price,
  rating_average,
  review_count,
  all_time_quantity_sold,
  thumbnail_url,
  brand,
  category,
  ecommerce_site,
  affiliate_link,
  visit,
}: ProductDTO) => {
  const existedProduct = await Product.findOne({
    product_id: product_id,
    shop_id: shop_id,
  });

  if (existedProduct) {
    throw new Error("Product already exists");
  }

  const product = await Product.create({
    product_id,
    shop_id,
    short_url,
    price,
    original_price,
    rating_average,
    review_count,
    all_time_quantity_sold,
    thumbnail_url,
    brand,
    category,
    ecommerce_site,
    affiliate_link,
    visit,
  });
  await product.save();
  return product;
};

export const getProducts = async ({
  product_id,
  shop_id,
  affiliate_link,
  ecommerce_site,
  category,
  brand,
  thumbnail_url,
  visit,
  all_time_quantity_sold,
  review_count,
  rating_average,
  original_price,
  price,
  short_url,
}: ProductDTO) => {
  const query: any = {};

  if (product_id !== undefined)
    query.product_id = { $regex: product_id, $options: "i" };
  if (shop_id !== undefined) query.shop_id = { $regex: shop_id, $options: "i" };
  if (affiliate_link !== undefined)
    query.affiliate_link = { $regex: affiliate_link, $options: "i" };
  if (ecommerce_site !== undefined)
    query.ecommerce_site = { $regex: ecommerce_site, $options: "i" };
  if (category !== undefined)
    query.category = { $regex: category, $options: "i" };
  if (brand !== undefined) query.brand = { $regex: brand, $options: "i" };
  if (thumbnail_url !== undefined)
    query.thumbnail_url = { $regex: thumbnail_url, $options: "i" };
  if (visit !== undefined) query.visit = visit;
  if (all_time_quantity_sold !== undefined)
    query.all_time_quantity_sold = all_time_quantity_sold;
  if (review_count !== undefined) query.review_count = review_count;
  if (rating_average !== undefined) query.rating_average = rating_average;
  if (original_price !== undefined) query.original_price = original_price;
  if (price !== undefined) query.price = price;
  if (short_url !== undefined) query.short_url = short_url;

  const products = await Product.find(query);
  return products;
};

export const updateProduct = async (product: ProductDTO) => {
  const existedProduct = await Product.findOne({
    product_id: product.product_id,
    shop_id: product.shop_id,
  });
  if (!existedProduct) {
    throw new Error("Product not found");
  }
  await Product.updateOne(
    { product_id: product.product_id, shop_id: product.shop_id },
    product
  );
  return product;
};

export const deleteProduct = async ({
  product_id,
  shop_id,
}: {
  product_id: string;
  shop_id: string;
}) => {
  const product = await Product.findOne({
    product_id: product_id,
    shop_id: shop_id,
  });
  if (!product) {
    throw new Error("Product not found");
  }
  await Product.deleteOne({ _id: product._id });
};

export const visitProduct = async ({
  product_id,
  shop_id,
}: {
  product_id: string;
  shop_id: string;
}) => {
  const product = await Product.findOne({
    product_id: product_id,
    shop_id: shop_id,
  });
  if (!product) {
    throw new Error("Product not found");
  }
  product.visit += 1;
  await product.save();
  return product;
};
