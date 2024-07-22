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
  thumbnail_url: string;
  brand: string;
  category: string;
  ecommerce_site: string;
  affiliate_link: string;
  visit: number;
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
  const products = await Product.find({
    product_id: product_id,
    shop_id: shop_id,
    affiliate_link: affiliate_link,
    ecommerce_site: ecommerce_site,
    category: category,
    brand: brand,
    thumbnail_url: thumbnail_url,
    visit: visit,
    all_time_quantity_sold: all_time_quantity_sold,
    review_count: review_count,
    rating_average: rating_average,
    original_price: original_price,
    price: price,
    short_url: short_url,
  });
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
