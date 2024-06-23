import dotenv from "dotenv";
import Product from "../model/productModel.js";
dotenv.config();

const URL = "https://s3.amazonaws.com/roxiler.com/product_transaction.json";

const feedDataToDb = async () => {
  try {
    const res = await fetch(URL);
    if (!res.ok) {
      throw new Error("Error in fetching data");
    }
    const data = await res.json();

    data.forEach((item) => {
      const product = new Product({
        title: item?.title,
        price: item?.price,
        description: item?.description,
        category: item?.category,
        image: item?.image,
        sold: item?.sold,
        dateOfSale: item?.dateOfSale,
      });

      product.save();
    });
  } catch (error) {
    console.error(error);
  }
};

export default feedDataToDb;
