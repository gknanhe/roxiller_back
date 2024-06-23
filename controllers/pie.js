import { months } from "../constant.js";
import Product from "../model/productModel.js";

export const pie = async (req, res) => {
  try {
    const monthName = req.query.month || "march";
    //get month number
    const monthNum = months[monthName.toLowerCase()];

    const pieChart = await Product.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $substrBytes: ["$dateOfSale", 5, 2] }, monthNum],
          },
        },
      },
      {
        $group: {
          _id: "$category",
          itemCount: { $sum: 1 },
        },
      },
      {
        $project: {
          category: "$_id",
          itemCount: 1,
          _id: 0,
        },
      },
    ]);

    return res.status(200).json({
      pieChart,
      message: "Fetched Successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
      message: "Internal Error ",
      success: false,
    });
  }
};
