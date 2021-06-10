import React from "react";
import ComputerSquare from "./ComputerSquare.jsx";

const Computer = ({ gameStarted, player, computer, alerts, playerMove }) => {
  return (
    <div className="computer-container">
      <div className="board">
        {computer.board.map((row, index) =>
          row.map((sqr, idx) => (
            <ComputerSquare
              key={index + "" + idx}
              coordinates={index + "" + idx}
              gameStarted={gameStarted}
              playerMove={playerMove}
            />
          ))
        )}
      </div>
      <div className="legend">
        <div className="alerts">{alerts}</div>
      </div>
    </div>
  );
};

export default Computer;
