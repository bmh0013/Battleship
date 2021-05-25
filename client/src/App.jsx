import React from 'react';
import Board from './Components/Board.jsx';

const App = () => {
  return (
    <div className="App">
      <div className="board-container">
        <Board type="p1"/>
        <Board type="c1"/>
      </div>
    </div>
  );
}

export default App;
