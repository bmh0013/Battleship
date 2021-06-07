import React from "react";
import PlayerBoard from "./Components/PlayerBoard.jsx";
import ComputerBoard from "./Components/ComputerBoard.jsx";
import Button from "./Components/Button.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
      alerts: "Place your ships",
    };

    this.startGame = this.startGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.updateAlerts = this.updateAlerts.bind(this);
  }

  startGame(e) {
    const ships = document.querySelector(".ship-container");

    if (!ships.children.length) {
      e.target.disabled = true;
      e.target.classList.add("disabled");
      this.setState({
        gameStarted: true,
        alerts: "You're turn"
      });
    } else {
      this.setState({
        alerts: "You must place all your ships before you can start",
      });
    }
  }

  resetGame() {
    window.location.reload(false);
  }

  gameOver(winner) {
    if (winner === 'player') {
      this.setState({ gameStarted: false, alerts: 'You won!'});
    } else {
      this.setState({ gameStarted: false, alerts: 'You lost :('});
    }
  }

  updateAlerts(message) {
    this.setState({ alerts: message });
  }

  render() {
    return (
      <div className="app">
        <div className="alerts">{this.state.alerts}</div>
        <div className="button-container">
          <Button type="Start Game" handleClick={this.startGame} />
          <Button type="Reset Game" handleClick={this.resetGame} />
        </div>
        <div className="board-container">
          <PlayerBoard
            type="p1"
            gameStarted={this.state.gameStarted}
            handlePlayerMove={this.handlePlayerMove}
            updateAlerts={this.updateAlerts}
          />
          <ComputerBoard
            gameStarted={this.state.gameStarted}
            gameOver={this.gameOver}
            handlePlayerMove={this.handlePlayerMove}
            updateAlerts={this.updateAlerts}
          />
        </div>
      </div>
    );
  }
}

export default App;
