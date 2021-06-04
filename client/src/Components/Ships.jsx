import React from "react";
import Ship from "./Ship.jsx";

const Ships = ({ ships, selectShip }) => {
  return (
    <>
      {ships.map((ship, index) => {
        return (
          <Ship
            size={ship.size}
            type={ship.type}
            selectShip={selectShip}
            key={index}
          />
        );
      })}
    </>
  );
};

export default Ships;
