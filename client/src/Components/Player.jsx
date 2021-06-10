import React from "react";
import PlayerSquare from "./PlayerSquare.jsx";
import Ships from "./Ships.jsx";

const Player = ({
  gameStarted,
  player,
  computer,
  rotateShips,
  selectShip,
  placeShip,
  addSquareToMoves,
}) => {
  return (
    <div className="player-container">
      <div className="board">
        {player.board.map((row, index) =>
          row.map((col, idx) => (
            <PlayerSquare
              key={index + "" + idx}
              coordinates={index + "" + idx}
              placeShip={placeShip}
              addSquareToMoves={addSquareToMoves}
            />
          ))
        )}
      </div>
      <div className="legend">
        <img
          alt="Rotate Ships"
          src="Rotate.png"
          className="rotate-icon"
          onClick={rotateShips}
        />
        <div className={"ship-container " + player.shipDirection}>
          <Ships
            ships={player.ships}
            direction={player.shipDirection}
            selectShip={selectShip}
            currentShip={player.currentShip}
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
