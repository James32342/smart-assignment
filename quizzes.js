import express from "express";
import Quiz from "../models/Quiz.js";
const router = express.Router();

// Teacher creates quiz
router.post("/", async(req,res)=>{
  const quiz = await Quiz.create(req.body);
  res.json(quiz);
});

// Student submits answers
router.post("/submit/:id", async(req,res)=>{
  const { answers, student } = req.body;
  const quiz = await Quiz.findById(req.params.id);
  let score = 0;
  quiz.questions.forEach((q,i)=> { if(q.answer === answers[i]) score++; });
  quiz.submissions.push({ student, score });
  await quiz.save();
  res.json({ score });
});

// Get leaderboard
router.get("/leaderboard/:id", async(req,res)=>{
  const quiz = await Quiz.findById(req.params.id);
  res.json(quiz.submissions.sort((a,b)=>b.score - a.score));
});

export default router;
