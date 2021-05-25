import React from 'react';

const Ship = ({ size }) => {
  let mapShip = new Array(size - 2).fill(0);

  return (
    <div className="ship-container">
      <div className='ship ship-head'></div>
      {mapShip.map( (ship, index) => {
        return <div className="ship ship-body" key={index}></div>
      })}
      <div className='ship ship-tail'></div>
    </div>
  )
}

export default Ship;