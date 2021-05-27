import React from "react";

const Ship = ({ size, selectShip }) => {
  let mapShip = new Array(size - 2).fill(0);

  let key = {
    2: 'destroyer',
    3: 'cruiser',
    4: 'battleship',
    5: 'carrier',
  }

  return (
    <div className="ship-container">
      <div className={key[size] + " head"} size={size} onClick={selectShip} />
      {mapShip.map((ship, index) => {
        return (
          <div className={key[size] + " body"} key={index} onClick={selectShip} />
        );
      })}
      <div className={key[size] + " tail"} onClick={selectShip} />
    </div>
  );
};

export default Ship;
