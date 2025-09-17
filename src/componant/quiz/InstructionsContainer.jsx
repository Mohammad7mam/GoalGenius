import React, { useEffect, useState } from "react";

const InstructionsContainer = ({ onStartQuiz, borderColor, containerBgColor }) => {
  const [bgColor, setBgColor] = useState(containerBgColor);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBgColor("#ffffff");
    }, 100); // بعد 100 مللي ثانية يبدأ التحول

    return () => clearTimeout(timer);
  }, [containerBgColor]); // كل ما تغيّرت الخلفية الأصلية، أعد التحول

  return (
<div
  className="instructions-container"
  style={{
    border: `1px solid ${borderColor}`,
    backgroundColor: bgColor,
    transition: "background-color 2s ease-in-out",

  }}
>
  <h2 className="instructions-title" >Quiz Instructions</h2>
  <ul className="instructions-list">
    <li>🧠 The quiz consists of <strong>10 questions</strong>, randomly selected from our football database.</li>
    <li>⏱️ You will have a total of <strong>10 minutes</strong> to complete the quiz — that’s around 1 minute per question.</li>
    <li>✅ Each question has <strong>only one correct answer</strong>. Choose wisely!</li>
    <li>🔒 Once you submit an answer, you cannot change it or go back to previous questions.</li>
    <li>🟥 If you answer incorrectly, the wrong option will be highlighted in <strong>red</strong>.</li>
    <li>🟩 The correct answer will be revealed in <strong>green</strong> after you make a selection — whether you were right or wrong.</li>
    <li>🎯 Try to focus and read each question carefully before selecting an answer.</li>
    <li>📊 At the end of the quiz, you'll see your score and how many answers you got right or wrong.</li>
    <li>🚀 Use this quiz to challenge yourself, learn new facts, and track your progress over time.</li>
  </ul>

  <button className="start-button" onClick={onStartQuiz}>
    Start Quiz
  </button>
</div>
  );
};

export default InstructionsContainer;
