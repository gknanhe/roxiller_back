import mongoose from "mongoose";

const productSChema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    price: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    sold: {
      type: Boolean,
      required: true,
    },

    dateOfSale: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("products", productSChema);
export default Product;
