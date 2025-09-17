import React from "react";

export default function WrongAnswersTable({ wrongAnswers, allQuestions }) {
  if (!wrongAnswers || wrongAnswers.length === 0) return null;

  const getQuestionDetails = (questionId) => {
    return allQuestions.find((q) => q.id === questionId);
  };

  return (
    <div className="wrong-answers-table">
      <h3>Top 10 Wrong Answers</h3>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Question</th>
            <th>Your Answer</th>
            <th>Correct Answer</th>
          </tr>
        </thead>
        <tbody>
          {wrongAnswers.map((ans, index) => {
            const question = getQuestionDetails(ans.questionId);
            if (!question) return null;

            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{question.title}</td>
                <td style={{ color: "red" }}>
                  {question.options[ans.selectedIndex]}
                </td>
                <td style={{ color: "green" }}>
                  {question.options[question.correctAnswerIndex]}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
