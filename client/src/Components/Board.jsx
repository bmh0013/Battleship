import React from 'react';
import Squares from './Squares.jsx';

const Board = ({ type }) => {
  let mapBoard = new Array(100).fill(0);
  let matrix = new Array(10).fill( new Array(10).fill(0) );
  console.log(matrix);

  const handlePlayerMove = (e) => {
    let square = document.getElementById(e.target.id);

    if (!square.classList.contains('clicked') && type === 'c1') {
      square.classList.add('clicked');

      let [x, y] = e.target.id.split('-')[1];
      let move = matrix[x][y] === 0 ? 'miss' : 'hit';
      square.classList.add(move);
    }
  }

  return (
    <div className="board">
      {mapBoard.map((sqr, index) =>
       <Squares type={type} id={index} key={index} handlePlayerMove={handlePlayerMove} />
      )}
    </div>
  )
}

export default Board;