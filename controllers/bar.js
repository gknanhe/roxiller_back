import { months } from "../constant.js";
import Product from "../model/productModel.js";

export const bar = async (req, res) => {
  try {
    const monthName = req.query.month || "march";
    //get month number
    const monthNum = months[monthName.toLowerCase()];

    const barChart = await Product.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $substrBytes: ["$dateOfSale", 5, 2] }, monthNum],
          },
        },
      },
      {
        $bucket: {
          groupBy: "$price",
          boundaries: [
            "0",
            "101",
            "201",
            "301",
            "401",
            "501",
            "601",
            "701",
            "801",
            "901",
          ],
          default: "901-above",
          output: { count: { $sum: 1 } },
        },
      },
    ]);

    return res.status(200).json({
      barChart,
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
