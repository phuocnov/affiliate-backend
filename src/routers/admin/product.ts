import express from "express";

import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../../service/product";

const product = express.Router();

product.get("/", (req, res) => {
  try {
    const {
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
    } = req.query;
    const products = getProducts({
      product_id: product_id as string,
      shop_id: shop_id as string,
      affiliate_link: affiliate_link as string,
      ecommerce_site: ecommerce_site as string,
      category: category as string,
      brand: brand as string,
      thumbnail_url: thumbnail_url as string,
      visit: Number(visit),
      short_url: short_url as string,
    });
    res.status(200).json(products);
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ message: errorMessage });
  }
});

product.post("/", (req, res) => {
  try {
    const {
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
    } = req.body;
    const newProduct = createProduct({
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
    });
    res.status(201).json(newProduct);
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ message: errorMessage });
  }
});

product.put("/:product_id", (req, res) => {
  try {
    const { product_id } = req.params;
    const {
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
    } = req.body;
    const updatedProduct = updateProduct({
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
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ message: errorMessage });
  }
});

product.delete("/:product_id/:shop_id", (req, res) => {
  try {
    const { product_id, shop_id } = req.params;
    deleteProduct({
      product_id: product_id as string,
      shop_id: shop_id as string,
    });
    res.status(204).send();
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ message: errorMessage });
  }
});

export default product;
