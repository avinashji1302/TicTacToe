import React, { useEffect, useState } from "react";
import Square from "./Square";
import "./Board.css";
function Board() {
  const [state, setState] = useState(Array(9).fill(null));
  const [isXturn, setXturn] = useState(true);

  // Saving Score in Session Stoarge
  const [blueScore, setBlueScore] = useState(
    parseInt(sessionStorage.getItem("blueScore")) || 0
  );
  const [redScore, setRedScore] = useState(
    parseInt(sessionStorage.getItem("redScore")) || 0
  );

  const handleClick = (index) => {
    if (state[index] !== null) {
      return;
    }

    const copyState = [...state];
    copyState[index] = isXturn ? "Blue" : "Red";
    setState(copyState);
    setXturn(!isXturn);
  };

  const checkWinner = () => {
    const winner = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let val of winner) {
      const [a, b, c] = val;
      if (state[a] !== null && state[a] === state[b] && state[a] === state[c]) {
        return state[a];
      }
    }
    return false;
  };

  const isWinner = checkWinner();

  useEffect(() => {
    sessionStorage.setItem("blueScore", blueScore.toString());
    sessionStorage.setItem("redScore", redScore.toString());
  }, [redScore, blueScore]);

  //Resting the game after win
  const handleReset = () => {
    setState(Array(9).fill(null));
  };

  return (
    <div className="board-container">
      <div className="score">
        <span className="blue-score">"Blue socre : {blueScore}</span> <br></br>
        <span className="red-score">"Red Score : {redScore}</span>
      </div>

      {isWinner ? (
        <>
          {" "}
          <h1>{isWinner} Won the game</h1>
          <button onClick={handleReset}>Reset</button>
        </>
      ) : (
        <>
          <h1>Start the Tic Toe game</h1>

          <div className="board-row">
            <Square onClick={() => handleClick(0)} value={state[0]} />
            <Square onClick={() => handleClick(1)} value={state[1]} />
            <Square onClick={() => handleClick(2)} value={state[2]} />
          </div>
          <div className="board-row">
            <Square onClick={() => handleClick(3)} value={state[3]} />
            <Square onClick={() => handleClick(4)} value={state[4]} />
            <Square onClick={() => handleClick(5)} value={state[5]} />
          </div>
          <div className="board-row">
            <Square onClick={() => handleClick(6)} value={state[6]} />
            <Square onClick={() => handleClick(7)} value={state[7]} />
            <Square onClick={() => handleClick(8)} value={state[8]} />
          </div>

          <h1>
            <button onClick={handleReset}>Reset Game </button>
          </h1>
        </>
      )}
    </div>
  );
}

export default Board;
