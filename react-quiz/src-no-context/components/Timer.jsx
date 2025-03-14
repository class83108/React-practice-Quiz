import { useEffect } from "react";

function Timer({ dispatch, secondRemaining }) {
  const mins = Math.floor(secondRemaining / 60);
  const seconds = secondRemaining % 60;
  useEffect(
    function () {
      const timer = setInterval(() => {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(timer);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
