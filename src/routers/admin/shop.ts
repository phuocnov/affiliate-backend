import express, { Request } from "express";
import { createShop, deleteShop, getShops, ShopDTO } from "../../service/shop";

const shop = express.Router();

shop.get("/", async (req, res) => {
  try {
    const {
      shop_id,
      name,
      short_description,
      long_description,
      thumbnail_url,
      brand,
      category,
      ecommerce_site,
      affiliate_link,
      visit,
    } = req.body;
    const shops = await getShops({
      shop_id: shop_id as string,
      name: name as string,
      short_description: short_description as string,
      long_description: long_description as string,
      thumbnail_url: thumbnail_url as string,
      brand: brand as string,
      category: category as string,
      ecommerce_site: ecommerce_site as string,
      affiliate_link: affiliate_link as string,
      visit: Number(visit),
    });
    res.status(200).json(shops);
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ message: errorMessage });
  }
});

shop.post("/", async (req, res) => {
  try {
    const {
      shop_id,
      name,
      short_description,
      long_description,
      thumbnail_url,
      brand,
      category,
      ecommerce_site,
      affiliate_link,
      visit,
    } = req.body;
    const newShop = await createShop({
      shop_id: shop_id as string,
      name: name as string,
      short_description: short_description as string,
      long_description: long_description as string,
      thumbnail_url: thumbnail_url as string,
      brand: brand as string,
      category: category as string,
      ecommerce_site: ecommerce_site as string,
      affiliate_link: affiliate_link as string,
      visit: Number(visit),
    });
    res.status(201).json({ message: "Shop created" });
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ message: errorMessage });
  }
});

shop.put("/:shop_id", async (req, res) => {
  try {
    const { shop_id } = req.params;
    const {
      name,
      short_description,
      long_description,
      thumbnail_url,
      brand,
      category,
      ecommerce_site,
      affiliate_link,
      visit,
    } = req.body;
    const updatedShop = await createShop({
      shop_id,
      name,
      short_description,
      long_description,
      thumbnail_url,
      brand,
      category,
      ecommerce_site,
      affiliate_link,
      visit,
    });
    res.status(200).json(updatedShop);
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ message: errorMessage });
  }
});

shop.delete("/:shop_id", async (req, res) => {
  try {
    const { shop_id } = req.params;
    const deleteResult = await deleteShop({ shop_id });
    res.status(204).send(deleteResult);
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ message: errorMessage });
  }
});

export default shop;
