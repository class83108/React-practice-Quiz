import { useContext, createContext, useReducer, useEffect } from "react";

const QuizContext = createContext();

const SEC_PER_QUESTION = 30;

const initialState = {
  questions: [],

  // loading, error, ready, active, finished
  status: "loading",

  // 用來判斷現在要顯示的問題
  index: 0,

  // 用戶選擇的答案
  answer: null,

  // 用戶的分數
  points: 0,

  highscore: 0,

  // 當點測驗開始時，開始倒計時
  secondRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondRemaining: state.questions.length * SEC_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
        status: state.secondRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
}

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, secondRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const initalPoint = 0;
  const maxPossiblePoints = questions.reduce(
    (accumulator, currentValue) => accumulator + currentValue.points,
    initalPoint
  );

  useEffect(function () {
    fetch("http://localhost:9000/questions/")
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: "dataReceived",
          payload: data,
        })
      )
      .catch((err) =>
        dispatch({
          type: "dataFailed",
        })
      );
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondRemaining,
        numQuestions,
        initalPoint,
        maxPossiblePoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext was used outside QuizProvider;");
  return context;
}

export { QuizProvider, useQuiz };
