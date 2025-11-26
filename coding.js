import express from "express";
const router = express.Router();
import { exec } from "child_process";

// Run student code (Node.js only for demo)
router.post("/run", async(req,res)=>{
  const { code } = req.body;
  exec(`node -e "${code}"`, (error, stdout, stderr)=>{
    if(error) return res.json({ error: stderr });
    res.json({ output: stdout });
  });
});

export default router;
