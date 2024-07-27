import Category, { ICategory } from "../models/category";

export const createCategory = async ({
  code,
  desc,
}: {
  code: string;
  desc: string;
}): Promise<ICategory> => {
  const existedCategory = await Category.findOne({
    code: code,
  });

  if (existedCategory) {
    throw new Error("Category already exists");
  }

  const category = await Category.create({
    code,
    desc,
  });
  await category.save();
  return category;
};

export const getCategories = async ({
  code,
  desc,
}: {
  code?: string;
  desc?: string;
}): Promise<ICategory[]> => {
  const query: any = {};
  if (code) {
    query.code = code;
  }
  if (desc) {
    query.desc = { $regex: desc, $options: "i" };
  }

  return Category.find(query);
};

export const updateCategory = async ({
  code,
  desc,
}: {
  code: string;
  desc: string;
}): Promise<ICategory> => {
  const category = await Category.findOne({ code: code });
  if (!category) {
    throw new Error("Category not found");
  }
  category.desc = desc;
  await category.save();
  return category;
};

export const deleteCategory = async ({
  code,
}: {
  code: string;
}): Promise<void> => {
  const category = await Category.findOne({ code: code });
  if (!category) {
    throw new Error("Category not found");
  }
  await Category.deleteOne({ _id: category._id });
};
