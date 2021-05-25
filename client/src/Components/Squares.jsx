import React from 'react';

const Squares = ({ type, id, handlePlayerMove }) => {
  id = type + '-' + String(id).padStart(2, 0);

  return (
    <div className="squares" id={id} onClick={handlePlayerMove} >
    </div>
  )
}

export default Squares;