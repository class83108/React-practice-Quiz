function FinishScreen({ points, maxPossibilePoints, highscore, dispatch }) {
  const percentage = (points / maxPossibilePoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🏆";
  if (percentage <= 100 && percentage >= 80) emoji = "🎉";
  if (percentage <= 80 && percentage >= 50) emoji = "😝";
  if (percentage <= 50 && percentage >= 0) emoji = "🙂";
  if (percentage === 100) emoji = "🤦‍♂️";
  return (
    <>
      <p className="result">
        <span>{emoji}</span>
        Your scored <strong>{points}</strong> out of {maxPossibilePoints} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <div className="restart">
        <button
          className="btn btn-ui"
          onClick={() =>
            dispatch({
              type: "restart",
            })
          }
        >
          Restart quiz
        </button>
      </div>
    </>
  );
}

export default FinishScreen;
