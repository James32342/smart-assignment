import { useState, useEffect } from "react";
import { api } from "../services/api";

export default function Quiz({ quizId }) {
  const [quiz,setQuiz] = useState(null);
  const [answers,setAnswers] = useState([]);
  const [score,setScore] = useState(null);
  const [leaderboard,setLeaderboard] = useState([]);

  useEffect(()=>{
    api.get(`/quizzes/${quizId}`).then(r=>setQuiz(r.data));
    api.get(`/quizzes/leaderboard/${quizId}`).then(r=>setLeaderboard(r.data));
  },[]);

  const submit = async()=>{
    const r = await api.post(`/quizzes/submit/${quizId}`,{ student:"Demo", answers });
    setScore(r.data.score);
    const lb = await api.get(`/quizzes/leaderboard/${quizId}`);
    setLeaderboard(lb.data);
  }

  if(!quiz) return <div>Loading...</div>;

  return <>
    <h2>{quiz.title}</h2>
    {quiz.questions.map((q,i)=>(
      <div key={i}>
        <p>{q.question}</p>
        {q.options.map((opt,j)=>(
          <label key={j}>
            <input type="radio" name={i} onChange={()=>answers[i]=j}/>
            {opt}
          </label>
        ))}
      </div>
    ))}
    <button onClick={submit}>Submit</button>
    {score!==null && <p>Your score: {score}</p>}
    <h3>Leaderboard:</h3>
    <ul>
      {leaderboard.map((s,i)=><li key={i}>{s.student}: {s.score}</li>)}
    </ul>
  </>
}
