import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  title: String,
  questions: [{ question: String, options: [String], answer: Number }],
  submissions: [{ student: String, score: Number }]
});

export default mongoose.model("Quiz", quizSchema);
