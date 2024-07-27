import express from "express";

import {
  getBrands,
  createBrand,
  deleteBrand,
  updateBrand,
} from "../../service/brand";

const brand = express.Router();

brand.get("/", async (req, res) => {
  try {
    const { code } = req.query;
    const brands = await getBrands({ code: code as string });
    res.status(200).json(brands);
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ message: errorMessage });
  }
});

brand.post("/", async (req, res) => {
  try {
    const { code, desc } = req.body;
    const newBrand = await createBrand({ code, desc });
    res.status(201).json(newBrand);
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ message: errorMessage });
  }
});

brand.put("/:code", async (req, res) => {
  try {
    const { code } = req.params;
    const { desc } = req.body;
    const updatedBrand = await updateBrand({ code, desc });
    res.status(200).json(updatedBrand);
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ message: errorMessage });
  }
});

brand.delete("/:code", async (req, res) => {
  try {
    const { code } = req.params;
    await deleteBrand({ code });
    res.status(204).send();
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ message: errorMessage });
  }
});

export default brand;
