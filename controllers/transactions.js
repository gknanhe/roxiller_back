import Product from "../model/productModel.js";
import { months } from "../constant.js";

//controller func for all transaction api
export const transactions = async (req, res) => {
  try {
    const page = Number(req.query.page);
    const perPage = Number(req.query.limit);

    //search query
    const searchQuery = req.query.search || "";

    const monthName = req.query.month || "march";
    //get month number
    const monthNum = months[monthName.toLowerCase()];
    // console.log(monthNum);
    //skip documents for pagination
    const skip = (page - 1) * perPage;
    // console.log(req.query);

    //query

    const query = {
      $and: [
        {
          $or: [
            { title: { $regex: searchQuery, $options: "i" } },
            { description: { $regex: searchQuery, $options: "i" } },
            { price: { $regex: searchQuery, $options: "i" } },
          ],
        },
        {
          $expr: {
            $eq: [{ $substrBytes: ["$dateOfSale", 5, 2] }, monthNum],
          },
        },
      ],
    };

    //fetch products wrt limit
    const products = await Product.find(query).skip(skip).limit(perPage);

    //total documents
    const totalDocs = await Product.countDocuments(query);

    //count total pages
    const totalPages = Math.ceil(totalDocs / perPage);

    //return the response
    return res.status(200).json({
      products,
      skip,
      page,
      perPage,
      totalPages,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
      message: "something went wrong",
      success: false,
    });
  }
};
