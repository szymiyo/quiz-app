import Answers from "./Answers"
import QuestionTimer from "./QuestionTimer"

export default function Question({ questionText, answers, onSelectAnswer, selectedAnswers, answerState, onSkipAnswer }) {
  return (
    <div id="question">
      <QuestionTimer
        timeout={10000}
        onTimeout={onSkipAnswer}
      />
      <h2>{questionText}</h2>
      <Answers
        answers={answers}
        selectedAnswers={selectedAnswers}
        answerState={answerState}
        onSelect={onSelectAnswer}
      />
  </div>
  )
}