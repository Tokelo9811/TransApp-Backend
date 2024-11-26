import express from "express";
import mongoose from "mongoose";
import "./routes/user-routes.js";
import translationRouter from "./routes/translationRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/translation", translationRouter);

mongoose
  .connect(
    "mongodb+srv://tokelomagutles3:QLsLcAwFFVV16BCM@cluster0.32nd8.mongodb.net/BlogA?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(5000, () => {
      console.log(
        "Connected to Database and Server is run on http://localhost:5000"
      );
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
