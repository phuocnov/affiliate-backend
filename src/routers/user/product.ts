import express from "express";
import { getProducts, visitProduct } from "../../service/product";

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

product.put("/:product_id/:shop_id", async (req, res) => {
  try {
    const { product_id, shop_id } = req.params;
    await visitProduct({ product_id, shop_id });
    res.status(200).json({ message: "Product visited" });
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ message: errorMessage });
  }
});
