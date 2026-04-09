import { useState } from "react";

const questions = [
  "How much you feel positive today?",
  "How much you feel energetic?",
  "How much you feel relaxed?"
];

function Mood() {
  const [answers, setAnswers] = useState([3, 3, 3]);
  const [result, setResult] = useState("");

  const submitMood = async () => {
    const res = await fetch("http://localhost:5000/mood", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    });

    const data = await res.json();

    // ✅ FIXED HERE
    setResult(`Mood: ${data.moodResult} (Score: ${data.totalScore})`);
  };

  return (
    <div className="page">
      <h2>Mood Tracker</h2>

      {questions.map((q, i) => (
        <div key={i}>
          <p>{q}</p>
          <input
            type="range"
            min="1"
            max="10"
            value={answers[i]}
            onChange={(e) => {
              const copy = [...answers];
              copy[i] = Number(e.target.value);
              setAnswers(copy);
            }}
          />
        </div>
      ))}

      <button onClick={submitMood}>Submit</button>
      {result && <h3>{result}</h3>}
    </div>
  );
}

export default Mood;
