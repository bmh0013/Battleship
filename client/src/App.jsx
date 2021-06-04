import React from "react";
import PlayerBoard from "./Components/PlayerBoard.jsx";
import ComputerBoard from "./Components/ComputerBoard.jsx";
import Button from "./Components/Button.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
      isWinner: null,
    };

    this.startGame = this.startGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.gameOver = this.gameOver.bind(this);
  }

  startGame(e) {
    e.target.disabled = true;
    e.target.classList.add("disabled");
    this.setState({
      gameStarted: true,
    });
  }

  resetGame() {
    window.location.reload(false);
  }

  gameOver(winner) {
    this.setState({ gameStarted: false, isWinner: winner });
  }

  render() {
    const winner = this.state.isWinner ? (
      <div className="winner-winner"> You Won!!!</div>
    ) : (
      <div className="winner-winner">Computer Won!</div>
    );

    return (
      <div className="app">
        {this.state.isWinner !== null && winner}
        <div className="button-container">
          <Button type="Start Game" handleClick={this.startGame} />
          <Button type="Reset Game" handleClick={this.resetGame} />
        </div>
        <div className="board-container">
          <PlayerBoard
            type="p1"
            gameStarted={this.state.gameStarted}
            handlePlayerMove={this.handlePlayerMove}
          />
          <ComputerBoard
            gameStarted={this.state.gameStarted}
            gameOver={this.gameOver}
            handlePlayerMove={this.handlePlayerMove}
          />
        </div>
      </div>
    );
  }
}

export default App;
