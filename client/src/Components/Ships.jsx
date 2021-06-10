import React from "react";
import Ship from "./Ship.jsx";

const Ships = ({ ships, selectShip, direction, currentShip }) => {
  return (
    <>
      {ships.map((ship, index) => {
        return (
          <Ship
            key={index}
            type={ship.type}
            size={ship.size}
            placed={ship.placed}
            direction={direction}
            selectShip={selectShip}
            currentShip={currentShip}
          />
        );
      })}
    </>
  );
};

export default Ships;
