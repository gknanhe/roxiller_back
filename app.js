import express from "express";
import feedDataToDb from "./db/feedDataToDB.js";
import dotenv from "dotenv";
import allRoutes from "./routes/allRoutes.js";
import connectMongoDB from "./db/connectMongoDB.js";
import cors from "cors";
const app = express();
dotenv.config();

// cors
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true, //for headers cookies
  })
);

//use routes
app.use(express.json());

app.use("/api", allRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectMongoDB();
  // feedDataToDb(); //call only once
  console.log(`Server running on port ${PORT}`);
});
