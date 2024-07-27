import Brand, { IBrand } from "../models/brand";

export const createBrand = async ({
  code,
  desc,
}: {
  code: string;
  desc: string;
}): Promise<IBrand> => {
  const existedBrand = await Brand.findOne({
    code: code,
  });

  if (existedBrand) {
    throw new Error("Brand already exists");
  }

  const brand = await Brand.create({
    code,
    desc,
  });
  await brand.save();
  return brand;
};

export const getBrands = async ({
  code,
  desc,
}: {
  code?: string;
  desc?: string;
}): Promise<IBrand[]> => {
  const query: any = {};
  if (code) {
    query.code = code;
  }
  if (desc) {
    query.desc = { $regex: desc, $options: "i" };
  }
  return Brand.find(query);
};

export const updateBrand = async ({
  code,
  desc,
}: {
  code: string;
  desc: string;
}): Promise<IBrand> => {
  const brand = await Brand.findOne({ code: code });
  if (!brand) {
    throw new Error("Brand not found");
  }
  brand.desc = desc;
  await brand.save();
  return brand;
};

export const deleteBrand = async ({
  code,
}: {
  code: string;
}): Promise<void> => {
  const brand = await Brand.findOne({ code: code });
  if (!brand) {
    throw new Error("Brand not found");
  }
  await Brand.deleteOne({ _id: brand._id });
};
