import React from "react";
import Square from "./Square.jsx";

const Board = ({ type, gameStarted, handlePlayerMove }) => {
  let mapBoard = new Array(100).fill(0);

  return (
    <div className="board">
      {mapBoard.map((sqr, index) => (
        <Square
          type={type}
          coordinates={index}
          key={index}
          handlePlayerMove={handlePlayerMove}
        />
      ))}
    </div>
  );
};

export default Board;
