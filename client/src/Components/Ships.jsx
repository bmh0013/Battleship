import React from "react";
import Ship from "./Ship.jsx";

const Ships = ({ ships, selectShip, direction }) => {
  return (
    <>
      {ships.map((ship, index) => {
        return (
          <Ship
            size={ship.size}
            type={ship.type}
            selectShip={selectShip}
            direction={direction}
            key={index}
          />
        );
      })}
    </>
  );
};

export default Ships;
