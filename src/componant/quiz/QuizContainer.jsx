import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Timer from "./timer";
import CircularProgress from "@mui/joy/CircularProgress";
import Box from "@mui/joy/Box";
import { useMediaQuery } from "@mui/material";

const QuizContainer = ({
  duration = 600,
  questions,
  borderColor,
  isQuizStarted,
}) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(duration);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const question = questions[currentQuestionIndex];

  const [progress, setProgress] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTimeLeft((prev) => prev - 1);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [timeLeft, navigate]);

  // ✅ مؤقت انتهاء الوقت
  useEffect(() => {
    if (timeLeft <= 0) {
      navigate("/finished");
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, navigate]);

  // ✅ حفظ الأسئلة في الجلسة
  useEffect(() => {
    if (questions && questions.length > 0) {
      sessionStorage.setItem("quizQuestions", JSON.stringify(questions));
    }
  }, [questions]);

  // ✅ التعامل مع اختيار الإجابة
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

    // ✅ فرق التوقيت حسب صحة الجواب
    const delay = isCorrect ? 1000 : 2000;

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedOptionIndex(null);
        setShowCorrectAnswer(false);
      } else {
        navigate("/finished");
      }
    }, delay);
  };

  // ✅ إعداد المؤقت الرقمي
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  // ✅ إعداد دائرة الوقت
  const advancement = (timeLeft / duration) * 100;
  const isSmallScreen = useMediaQuery("(max-width:768px)");

  return (
    <div className="main-quiz">
      {/*<div className="timer-container">
      <svg width="10vw" height="10vw">
          <circle className="circle-bg" cx="100" cy="100" r={radius} />
          <circle
            className="circle-progress"
            cx="100"
            cy="100"
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={advancement}
          />
        </svg>
        <div className="timer-text">
          {minutes}:{seconds}
        </div>
        </div>*/}

      <>
        {!isSmallScreen && (
          <Box
            sx={{
              position: "relative",
              display: "inline-flex",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            {/* الخلفية الكاملة */}
            <Box
              sx={{
                position: "absolute",
                width: "9vw",
                height: "9vw",
                borderRadius: "50%",
                backgroundColor: "#ffffffff", // 👈 لون الخلفية
                zIndex: 0,
              }}
            />

            {/* دائرة التقدم */}
            <CircularProgress
              className="circle-bg"
              sx={{
                "--CircularProgress-trackThickness": "0.8784773060029283vw",
                "--CircularProgress-progressThickness": "0.9516837481698389vw",
                "--CircularProgress-size": "10vw",
                "--CircularProgress-progressColor":
                  borderColor || "primary.500",
                zIndex: 1,
              }}
              determinate
              value={advancement}
            >
              <div className="timer-text">
                {minutes}:{seconds}
              </div>
            </CircularProgress>
          </Box>
        )}
      </>

      <div
        className="start-container"
        style={{
          backgroundColor: isQuizStarted ? "#fff" : "var(--secondary-color)",
          border: `1px solid ${borderColor}`,
          transition:
            "background-color 2s ease-in-out, border 0.5s ease-in-out",
          flexDirection: "column",
        }}
      >
        <>
          {isSmallScreen && (
            <Box
              sx={{
                position: "relative",
                display: "inline-flex",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              {/* الخلفية الكاملة */}
              <Box
                sx={{
                  position: "absolute",
                  width: "9vw",
                  height: "9vw",
                  borderRadius: "50%",
                  backgroundColor: "#ffffffff", // 👈 لون الخلفية
                  zIndex: 0,
                }}
              />

              {/* دائرة التقدم */}
              <CircularProgress
                className="circle-bg"
                sx={{
                  "--CircularProgress-trackThickness": "8px",
                  "--CircularProgress-progressThickness": "8px",
                  "--CircularProgress-size": "70px",
                  "--CircularProgress-progressColor":
                    borderColor || "primary.500",
                  zIndex: 1,
                }}
                style={{
                  margin: "6px 0px",
                }}
                determinate
                value={advancement}
              >
                <div className="text-timer-pimery">
                  {minutes}:{seconds}
                </div>
              </CircularProgress>
            </Box>
          )}
        </>

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
              const isCorrectAnswer = index === question.correctAnswerIndex;
              const isSelectedAnswer = index === selectedOptionIndex;

              if (
                selectedOptionIndex === question.correctAnswerIndex &&
                isCorrectAnswer
              ) {
                className += " correct-glow"; // الإجابة صحيحة
              } else if (isSelectedAnswer) {
                className += " incorrect"; // المستخدم اختار إجابة خاطئة
              } else if (isCorrectAnswer) {
                className += " correct"; // أظهر الجواب الصحيح بعد الاختيار الخاطئ
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
                </span>{" "}
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

export default QuizContainer;
