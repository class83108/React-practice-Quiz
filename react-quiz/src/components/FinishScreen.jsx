function FinishScreen({ points, maxPossibilePoints }) {
  const percentage = (points / maxPossibilePoints) * 100;
  return (
    <p className="result">
      Your scored <strong>{points}</strong> out of {maxPossibilePoints} (
      {Math.ceil(percentage)})
    </p>
  );
}

export default FinishScreen;
