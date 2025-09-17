import React, { useState, useEffect } from "react";
import questions from "../../data/questions";
import { useNavigate } from "react-router-dom";

const StartContainer = ({
  duration = 600,
  containerBgColor,
  borderColor,
  
}) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(duration);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const question = questions[currentQuestionIndex];

  // ✅ تحديث المؤقت
  useEffect(() => {
    if (timeLeft <= 0) {
      navigate("/timeout");
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, navigate]);

  // ✅ عند اختيار إجابة
  const handleAnswerClick = (index) => {
    if (selectedOptionIndex !== null) return;

    setSelectedOptionIndex(index);
    setShowCorrectAnswer(true);

    const isCorrect = index === question.correctAnswerIndex;
    const answerResults =
      JSON.parse(sessionStorage.getItem("quizAnswers")) || [];

    answerResults[currentQuestionIndex] = {
      questionId: question.id,
      selectedIndex: index,
      isCorrect,
    };

    sessionStorage.setItem("quizAnswers", JSON.stringify(answerResults));

    // ✅ الانتقال للسؤال التالي بعد 2.5 ثانية
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedOptionIndex(null);
        setShowCorrectAnswer(false);
      } else {
        navigate("/finished");
      }
    }, 2500);
  };

  // ✅ الوقت
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  // ✅ الدائرة
  const radius = 65;
  const circumference = 2 * Math.PI * radius;
  const progress = ((duration - timeLeft) / duration) * circumference;

  return (
    <div className="main-quiz">
      <div className="timer-container">
        <svg width="10vw" height="10vw">
          <circle className="circle-bg" cx="100" cy="100" r={radius} />
          <circle
            className="circle-progress"
            cx="100"
            cy="100"
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={progress}
          />
        </svg>
        <div className="timer-text">
          {minutes}:{seconds}
        </div>
      </div>

      <div
        className="start-container"
        style={{
          backgroundColor: containerBgColor,
          border: `1px solid ${borderColor}`,
          transition: "background-color 2s ease-in-out, border 0.5s ease-in-out",
          flexDirection: "column",
        }}
      >
        <div className="Question-titlee">
          <div className="Question-title">
            <span className="question-label">Q{currentQuestionIndex + 1}</span>
            <h2 className="question-text">{question.title}</h2>
          </div>
        </div>

        <div className="question-options">
          {question.options.map((option, index) => {
            let className = "question-option";

            if (selectedOptionIndex !== null) {
              if (index === question.correctAnswerIndex) {
                className += " correct"; // ✅ الجواب الصحيح
              } else if (index === selectedOptionIndex) {
                className += " incorrect"; // ❌ الجواب المختار الخطأ
              }
            }

            return (
              <button
                key={index}
                className={className}
                onClick={() => handleAnswerClick(index)}
                disabled={selectedOptionIndex !== null}
                
              >
                <span className="question-option-label">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </button>
            );
          })}
        </div>

        <div className="Question-number">
          <span className="question-progress">
            <span>
              <span>{currentQuestionIndex + 1}</span>/
            </span>
            {questions.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StartContainer;
