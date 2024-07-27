import Shop from "../models/shop";

export interface ShopDTO {
  shop_id?: string;
  name: string;
  short_description: string;
  long_description: string;
  thumbnail_url: string;
  brand: string;
  category: string;
  ecommerce_site: string;
  affiliate_link: string;
  visit: number;
}

export const createShop = async ({
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
}: ShopDTO) => {
  const existedShop = await Shop.findOne({
    shop_id: shop_id,
  });

  if (existedShop) {
    throw new Error("Shop already exists");
  }

  const shop = await Shop.create({
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
  await shop.save();
  return shop;
};

export const getShops = async ({
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
}: ShopDTO) => {
  const query: any = {};

  if (shop_id) {
    query.shop_id = shop_id;
  }
  if (name) {
    query.name = { $regex: name, $options: "i" };
  }
  if (short_description) {
    query.short_description = { $regex: short_description, $options: "i" };
  }
  if (long_description) {
    query.long_description = { $regex: long_description, $options: "i" };
  }
  if (thumbnail_url) {
    query.thumbnail_url = { $regex: thumbnail_url, $options: "i" };
  }
  if (brand) {
    query.brand = { $regex: brand, $options: "i" };
  }
  if (category) {
    query.category = { $regex: category, $options: "i" };
  }
  if (ecommerce_site) {
    query.ecommerce_site = { $regex: ecommerce_site, $options: "i" };
  }
  if (affiliate_link) {
    query.affiliate_link = { $regex: affiliate_link, $options: "i" };
  }
  if (visit) {
    query.visit = visit;
  }

  return Shop.find(query);
};

export const updateShop = async ({
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
}: ShopDTO) => {
  const shop = await Shop.findOne({
    shop_id: shop_id,
  });

  if (!shop) {
    throw new Error("Shop not found");
  }

  shop.name = name;
  shop.short_description = short_description;
  shop.long_description = long_description;
  shop.thumbnail_url = thumbnail_url;
  shop.brand = brand;
  shop.category = category;
  shop.ecommerce_site = ecommerce_site;
  shop.affiliate_link = affiliate_link;
  shop.visit = visit;

  await shop.save();
  return shop;
};

export const deleteShop = async ({ shop_id }: { shop_id: string }) => {
  const shop = await Shop.findOne({ shop_id: shop_id });
  if (!shop) {
    throw new Error("Shop not found");
  }
  return await Shop.deleteOne({ _id: shop._id });
};
