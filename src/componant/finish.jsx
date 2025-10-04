import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Finish() {
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const answers = JSON.parse(sessionStorage.getItem("quizAnswers")) || [];
    const correctAnswers = answers.filter((ans) => ans.isCorrect).length;
    setScore(correctAnswers);
  }, []);

  const handleRetry = () => {
    sessionStorage.removeItem("quizAnswers");
    navigate("/quiz");
  };

  const handleExit = () => {
    sessionStorage.removeItem("quizAnswers");
    navigate("/");
  };

  // ✅ العلامة من 10 فقط
  const total = 10;

  // ✅ النسبة المئوية من 10 (لعرض اللون والدائرة)
  const percentage = (score / total) * 100;

  const successColor = score >= 5 ? "#00DF68" : "#EA2626";

  return (
    <div className="finish-page">
      <div
        className="background-half top-half"
        style={{ backgroundColor: successColor }}
      ></div>

      <div className="background-half bottom-half"></div>

      <div className="result-container">
        <h2>Result</h2>

        <div
          className="score-circle"
          style={{
            background: `conic-gradient(${successColor} ${percentage}%, #e0e0e0 ${percentage}%)`,
          }}
        >
          <div className="score-content" style={{ color: successColor }}>
            {score} / 10
          </div>
        </div>

        <div className="button-group">
          <button
            className="btn retry"
            onClick={handleRetry}
            style={{
              backgroundColor: score >= 5 ? successColor : "#EA2626",
            }}
          >
            Retry
          </button>
          <button className="btn exit" onClick={handleExit}>
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
