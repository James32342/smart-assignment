import { useState } from "react";
import { api } from "../services/api";

export default function Coding() {
  const [code,setCode] = useState(`console.log("Hello World")`);
  const [output,setOutput] = useState("");

  const run = async()=>{
    const r = await api.post("/coding/run",{ code });
    setOutput(r.data.output || r.data.error);
  }

  return <>
    <textarea rows={10} cols={50} value={code} onChange={e=>setCode(e.target.value)} />
    <br/>
    <button onClick={run}>Run Code</button>
    <pre>{output}</pre>
  </>
}
