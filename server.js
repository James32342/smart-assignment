import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import quizRoutes from "./routes/quizzes.js";
import codingRoutes from "./routes/coding.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/smart-assignment")
  .then(()=>console.log("MongoDB connected"));

app.use("/quizzes", quizRoutes);
app.use("/coding", codingRoutes);

app.listen(4000, ()=>console.log("Backend running on http://localhost:4000"));
