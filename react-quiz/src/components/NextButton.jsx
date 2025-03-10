import { useQuiz } from "../context/QuizContext";

function NextButton() {
  const { nextQuestion, answer, index, numQuestions, finish } = useQuiz();
  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <button className="btn btn-ui" onClick={() => nextQuestion()}>
        Next
      </button>
    );
  if (index === numQuestions - 1) {
    return (
      <button className="btn btn-ui" onClick={() => finish()}>
        Finish
      </button>
    );
  }
}

export default NextButton;
