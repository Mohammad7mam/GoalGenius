import React, { useState, useEffect } from "react";
import img0 from "../assets/img/markus-spiske-KWQ2kQtxiKE-unsplash 3.png";
import img1 from "../assets/img/image 133.png";
import img2 from "../assets/img/image 127.png";
import img3 from "../assets/img/image 130.png";
import BackgroundImage from "../componant/quiz/background-image";
import StartContainer from "../componant/quiz/StartContainer";
import QuizContainer from "../componant/quiz/QuizContainer";
import questions from "../data/questions";
import InstructionsContainer from "../componant/quiz/InstructionsContainer";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const hexToRGBA = (hex, alpha = 1) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const StartQuiz = () => {
  // ✅ تحميل الحالة من localStorage فقط عند الريفريش
  const savedState = JSON.parse(localStorage.getItem("quizState")) || {};

  const [activeIndex, setActiveIndex] = useState(savedState.activeIndex || 0);
  const [isQuizStarted, setIsQuizStarted] = useState(
    savedState.isQuizStarted || false
  );
  const [category, setCategory] = useState(savedState.category || null);
  const [showInstructions, setShowInstructions] = useState(
    savedState.showInstructions || false
  );
  const [useQuizBackground, setUseQuizBackground] = useState(
    savedState.useQuizBackground || false
  );

  // ✅ بداية الكويز
  const startQuiz = (selectedCategory) => {
    setCategory(selectedCategory);
    setShowInstructions(true);
    setUseQuizBackground(true);
  };

  // ✅ بدء الكويز الفعلي
  const beginActualQuiz = () => {
    setIsQuizStarted(true);
    setShowInstructions(false);
  };

   const [refreshDialogOpen, setRefreshDialogOpen] = React.useState(false);

  // ✅ افتح الدايالوج عند الريفريش
  React.useEffect(() => {
    const navigationType = performance.getEntriesByType("navigation")[0]?.type;

    if (navigationType === "reload") {
      setRefreshDialogOpen(true);
    }
  }, []);

  const handleRefreshDialogClose = () => {
    setRefreshDialogOpen(false);
  };

  const handleRestartQuiz = () => {
    // 🔁 منطق إعادة الاختبار
    window.location.reload();
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

  // ✅ تحديث الـ CSS
  useEffect(() => {
    document.documentElement.style.setProperty("--main-color", active.color);
    document.documentElement.style.setProperty(
      "--secondary-color",
      active.secondaryColor
    );
    document.documentElement.style.setProperty(
      "--main-color-transparent",
      bodyBgColor
    );
    document.documentElement.style.setProperty(
      "--main-border-color",
      borderColor
    );
  }, [activeIndex]);

  // ✅ تخزين الحالة فقط لأجل الريفريش
  useEffect(() => {
    localStorage.setItem(
      "quizState",
      JSON.stringify({
        activeIndex,
        isQuizStarted,
        category,
        showInstructions,
        useQuizBackground,
      })
    );
  }, [
    activeIndex,
    isQuizStarted,
    category,
    showInstructions,
    useQuizBackground,
  ]);

  // ✅ فلترة الأسئلة حسب الفئة
  const getRandomQuestions = (arr, count) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const filteredQuestions = getRandomQuestions(
    questions.filter((q) => q.category === category),
    10
  );

  return (
    <div
      className="quiz-body"
      style={{
        backgroundColor: useQuizBackground ? "transparent" : bodyBgColor,
        transition: !isQuizStarted ? "background-color 2s ease-in-out" : "none",
      }}
    >
      <BackgroundImage imageData={imageData} activeIndex={activeIndex} />

      {!isQuizStarted && !showInstructions && (
        <StartContainer
          containerBgColor={containerBgColor}
          borderColor={borderColor}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          startQuiz={startQuiz}
        />
      )}

      {showInstructions && !isQuizStarted && (
        <InstructionsContainer
          borderColor={borderColor}
          onStartQuiz={beginActualQuiz}
          containerBgColor={containerBgColor}
        />
      )}

      {isQuizStarted && (
        <QuizContainer
          borderColor={borderColor}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          questions={filteredQuestions}
          isQuizStarted={isQuizStarted}
        />
      )}
      
    </div>

    
  );
};

export default StartQuiz;
