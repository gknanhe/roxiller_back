import express from "express";
import { statistics } from "../controllers/statistics.js";
import { transactions } from "../controllers/transactions.js";
import { bar } from "../controllers/bar.js";
import { pie } from "../controllers/pie.js";
const router = express.Router();

//for home route
router.get("/", (req, res) => {
  res.send("This is Roxiller Assignment backend");
});

//route for all transactions

router.get("/all_transactions", transactions);
router.get("/statistics", statistics);
router.get("/bar", bar);
router.get("/pie", pie);
export default router;
