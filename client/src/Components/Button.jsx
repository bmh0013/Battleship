import React from 'react';

const StartButton = ({ handleStartGame }) => {
  return (
    <button className='start-button' onClick={handleStartGame}>
      Start Game
    </button>
  )
}

export default StartButton;