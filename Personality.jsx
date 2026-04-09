import { useState } from "react";

const questions = [
  "How much you enjoy social gatherings?",
  "How much you feel energized after meeting people?",
  "How much you like to be the center of attention?",
  "How much you prefer group activities over solo work?",
  "How much you feel comfortable starting conversations?"
];

function Personality() {
  const [answers, setAnswers] = useState([3, 3, 3, 3, 3]);
  const [result, setResult] = useState("");

  const submitPersonality = async () => {
    const response = await fetch("http://localhost:5000/personality", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    });

    const data = await response.json();

    // ✅ KEYS MATCH BACKEND
    setResult(
      `Personality: ${data.personality} (Score: ${data.score})`
    );
  };

  return (
    <div className="page">
      <h2>Personality Checker</h2>

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

      <button onClick={submitPersonality}>Submit</button>

      {result && <h3>{result}</h3>}
    </div>
  );
}

export default Personality;
