import React from "react";

const Ship = ({ type, size, placed, direction, selectShip, currentShip }) => {
  // Only render ship if it hasn't been placed
  if (!placed) {
    const shipBody = new Array(size - 2).fill(0);

    // Handles the CSS for the ships based on their orientation & if currentShip
    const containerDirection =
      direction === "vertical" ? "horizontal" : "vertical";
    const turn = direction === "vertical" ? "noturn" : "turn";
    let containerClassName = type + " " + containerDirection;

    if (currentShip.type === type) {
      containerClassName += " ship-selected";
    }

    return (
      <div className={containerClassName} size={size}>
        <div className={"ship head " + turn} onClick={() => selectShip(type)} />
        {shipBody.map((ship, index) => {
          return (
            <div
              key={index}
              className={"ship body " + turn}
              onClick={() => selectShip(type)}
            />
          );
        })}
        <div className={"ship tail " + turn} onClick={() => selectShip(type)} />
      </div>
    );
  } else {
    return <></>
  }
};

export default Ship;
