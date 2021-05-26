import React from "react";
import Squares from "./Squares.jsx";

const Board = ({ type, gameStarted, handlePlayerMove }) => {
  let mapBoard = new Array(100).fill(0);

  return (
    <div className="board">
      {mapBoard.map((sqr, index) => (
        <Squares
          type={type}
          id={index}
          key={index}
          handlePlayerMove={handlePlayerMove}
        />
      ))}
    </div>
  );
};

export default Board;
