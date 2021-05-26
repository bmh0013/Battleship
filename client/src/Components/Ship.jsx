import React from "react";

const Ship = ({ size, selectShip }) => {
  let mapShip = new Array(size - 2).fill(0);

  return (
    <div className="ship-container">
      <div className="ship ship-head" size={size} onClick={selectShip} />
      {mapShip.map((ship, index) => {
        return (
          <div className="ship ship-body" key={index} onClick={selectShip} />
        );
      })}
      <div className="ship ship-tail" onClick={selectShip} />
    </div>
  );
};

export default Ship;
