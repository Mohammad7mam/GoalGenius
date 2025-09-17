import React, { useState, useEffect } from "react";
import img0 from "../assets/img/markus-spiske-KWQ2kQtxiKE-unsplash 3.png";
import img1 from "../assets/img/image 133.png";
import img2 from "../assets/img/image 127.png";
import img3 from "../assets/img/image 130.png";
import BackgroundImage from "../componant/quiz/background-image";
import StartContainer from "../componant/quiz/StartContainer";
import QuizContainer from "../componant/quiz/QuizContainer";

// تحويل hex إلى rgba
const hexToRGBA = (hex, alpha = 1) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const StartQuiz = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  

  const startQuiz = () => {
    setIsQuizStarted(true);
  };

  const imageData = [
    {
      image: img0,
      blendMode: "normal",
      color: "#005F2D",
      secondaryColor: "#E5EFEA",
    },
    {
      image: img1,
      blendMode: "luminosity",
      color: "#733493",
      secondaryColor: "#F1EBF5",
    },
    {
      image: img2,
      blendMode: "luminosity",
      color: "#997500",
      secondaryColor: "#F5F1E5",
    },
    {
      image: img3,
      blendMode: "normal",
      color: "#00219E",
      secondaryColor: "#E5E9F5",
    },
  ];

  const handleMouseEnter = (index) => setActiveIndex(index);
  const handleMouseLeave = () => setActiveIndex(0);

  const active = imageData[activeIndex];
  const bodyBgColor = hexToRGBA(active.color, 0.1);
  const containerBgColor = active.secondaryColor;
  const borderColor = hexToRGBA(active.color, 0.8);

  // تحديث CSS Variables بناءً على الصورة الحالية
  useEffect(() => {
    document.documentElement.style.setProperty("--main-color", active.color);
    document.documentElement.style.setProperty("--secondary-color", active.secondaryColor);
    document.documentElement.style.setProperty("--main-color-transparent", bodyBgColor);
    document.documentElement.style.setProperty("--main-border-color", borderColor);
  }, [activeIndex]);

  return (
    <div
      className="quiz-body"
      style={{
        backgroundColor: !isQuizStarted ? bodyBgColor : "transparent",
        transition: !isQuizStarted ? "background-color 2s ease-in-out" : "none",
          }}
    >
      <BackgroundImage imageData={imageData} activeIndex={activeIndex} />

      {!isQuizStarted && (
        <StartContainer
          containerBgColor={containerBgColor}
          borderColor={borderColor}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          startQuiz={startQuiz}
        />
      )}

      {isQuizStarted && (
        <QuizContainer
          borderColor={borderColor}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      )}
    </div>
  );
};

export default StartQuiz;
