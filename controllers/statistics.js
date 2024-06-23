import { months } from "../constant.js";
import Product from "../model/productModel.js";

export const statistics = async (req, res) => {
  try {
    const searchQuery = req.query.search || "";

    const monthName = req.query.month || "march";
    //get month number
    const monthNum = months[monthName.toLowerCase()];

    //find all doc regardless of year and calculate statistics
    const statistics = await Product.find({
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
    });

    let totalPrice = [];
    let soldItems = [];

    statistics.map((each) => {
      //add price of each item into array
      totalPrice.push(Number(each.price));

      //add items into sold items array
      soldItems.push(each.sold);
    });

    //calculate totalPriceOfItems
    const totalPriceOfItems = totalPrice.reduce(
      (acc, current_Value) => acc + current_Value,
      0
    );

    let soldItemsNum = 0;
    let notSoldItemsNum = 0;

    soldItems.map((eachItem) => {
      if (eachItem === true) {
        soldItemsNum += 1;
        return soldItemsNum;
      } else {
        notSoldItemsNum += 1;
        return notSoldItemsNum;
      }
    });

    // console.log(soldItemsNum, notSoldItemsNum, totalPrice.length);

    return res.status(200).json({
      success: true,
      message: "Fetch statistics successfully",
      sold: soldItemsNum,
      notSold: notSoldItemsNum,
      totalPriceOfItems: Math.round(totalPriceOfItems),
      totalItems: statistics.length,
      month: monthName,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
      message: "Internal Error",
      success: false,
    });
  }
};
