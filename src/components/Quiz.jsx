import { useState, useCallback, useRef } from "react";
import QUESTIONS from '../questions';
import quizCompleteImg from '../assets/quiz-complete.png';
import Question from "./Question";

export default function Quiz() {
  const [answerState, setAnswerState] = useState('');
  const [userAnswer, setUserAnswer] = useState([]);

  const activeQuestionIndex = answerState === '' ? userAnswer.length : userAnswer.length -1;
  const quizComplete = activeQuestionIndex === QUESTIONS.length;
  
  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
    setAnswerState('answered');
    setUserAnswer((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });

    setTimeout(() => {
      if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
        setAnswerState('correct');
      } else {
        setAnswerState('wrong');
      }

      setTimeout(() => {
        setAnswerState('');
      }, 2000)
    }, 1000);
  }, [activeQuestionIndex]);

  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);
  
  if (quizComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Quiz Complete Icon" />
        <h2>Quiz Completed!</h2>
      </div>
    )
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        questionText={QUESTIONS[activeQuestionIndex].text}
        answers={QUESTIONS[activeQuestionIndex].answers}
        selectedAnswers={userAnswer[userAnswer.length - 1]}
        answerState={answerState}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}