import React, { useEffect } from 'react';

const Ship = ({ size, board }) => {
  // useEffect(() => {
  //   document.querySelectorAll('.ship').forEach(ship => {
  //     ship.addEventListener('click', selectShip);
  //   })
  // })

  let mapShip = new Array(size - 2).fill(0);

  const placeShip = (e) => {
    let ship = document.querySelector('.ship-selected');
    let size = ship.getAttribute('size');

    document.querySelectorAll('.squares').forEach(sqr => {
      sqr.removeEventListener('click', placeShip);
    })

    let type = e.target.id.split('-')[0];
    let [x, y] = e.target.id.split('-')[1];

    if ( type === 'p1' && board[x][y] === 0 ) {
      if ( (+x + +size) <= 10 ) {
        for (let i = +x; i < (+x + +size); i++) {
          console.log(i);
        }
      }
    }
  };

  const selectShip = (e) => {
    let selected = document.querySelectorAll('.ship-selected');
    let children = e.target.parentNode.childNodes;

    selected.forEach(ship => {
      ship.classList.remove('ship-selected');
    })

    children.forEach(child => {
      child.classList.add('ship-selected');
    });

    document.querySelectorAll('.squares').forEach(sqr => {
      sqr.addEventListener('click', placeShip);
    })
  };

  return (
    <div className="ship-container" >
      <div className='ship ship-head' size={size} onClick={selectShip}></div>
      {mapShip.map( (ship, index) => {
        return <div className="ship ship-body" key={index} onClick={selectShip}></div>
      })}
      <div className='ship ship-tail' onClick={selectShip}></div>
    </div>
  )
}

export default Ship;