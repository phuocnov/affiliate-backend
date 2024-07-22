import express from "express";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../service/category";

const category = express.Router();

category.get("/", (req, res) => {
  try {
    const { code } = req.query;
    const categories = getCategories({ code: code as string });
    res.status(200).json(categories);
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ message: errorMessage });
  }
});

category.post("/", (req, res) => {
  try {
    const { code, desc } = req.body;
    const newCategory = createCategory({ code, desc });
    res.status(201).json(newCategory);
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ message: errorMessage });
  }
});

category.put("/:code", (req, res) => {
  try {
    const { code } = req.params;
    const { desc } = req.body;
    const updatedCategory = updateCategory({ code, desc });
    res.status(200).json(updatedCategory);
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ message: errorMessage });
  }
});

category.delete("/:code", (req, res) => {
  try {
    const { code } = req.params;
    deleteCategory({ code });
    res.status(204).send();
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ message: errorMessage });
  }
});

export default category;
