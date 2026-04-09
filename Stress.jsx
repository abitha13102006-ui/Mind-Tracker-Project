import { useState } from "react";

const questions = [
  "How much you feel overwhelmed by daily tasks?",
  "How much you have difficulty relaxing?",
  "How much you feel anxious or worried often?",
  "How much you feel pressure from work or studies?",
  "How much you feel mentally exhausted?"
];

function Stress() {
  const [answers, setAnswers] = useState([3, 3, 3, 3, 3]);
  const [result, setResult] = useState("");

  const submitStress = async () => {
    const response = await fetch("http://localhost:5000/stress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    });

    const data = await response.json();

    // ✅ MATCH BACKEND KEYS
    setResult(
      `Stress Level: ${data.stressLevel} (Score: ${data.totalScore})`
    );
  };

  return (
    <div className="page">
      <h2>Stress Checker</h2>

      {questions.map((q, index) => (
        <div key={index}>
          <p>{q}</p>
          <input
            type="range"
            min="1"
            max="5"
            value={answers[index]}
            onChange={(e) => {
              const updated = [...answers];
              updated[index] = Number(e.target.value);
              setAnswers(updated);
            }}
          />
        </div>
      ))}

      <button onClick={submitStress}>Submit</button>

      {result && <h3>{result}</h3>}
    </div>
  );
}

export default Stress;
