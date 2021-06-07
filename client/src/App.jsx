import React from "react";
import Player from "./Components/Player.jsx";
import Computer from "./Components/Computer.jsx";
import Button from "./Components/Button.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
      alerts: "Place your ships",
      player: {
        board: [],
        hp: 17,
      },
      computer: {
        board: [],
        hp: 17,
      },
    };

    this.startGame = this.startGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.updateAlerts = this.updateAlerts.bind(this);
    this.updatePlayerState = this.updatePlayerState.bind(this);
    this.updateComputerState = this.updateComputerState.bind(this);
    this.checkHitpoints = this.checkHitpoints.bind(this);
  }

  startGame(e) {
    const ships = document.querySelector(".ship-container");

    if (!ships.children.length) {
      e.target.disabled = true;
      e.target.classList.add("disabled");
      this.setState({
        gameStarted: true,
        alerts: "You're turn",
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
    if (winner === "player") {
      this.setState({ gameStarted: false, alerts: "You won!" });
    } else {
      this.setState({ gameStarted: false, alerts: "You lost :(" });
    }
  }

  updateAlerts(message) {
    this.setState({ alerts: message });
  }

  updatePlayerState(playerObj) {
    const player = { ...this.state.player };
    player.board = playerObj.board;
    player.hp = playerObj.hp;
    this.setState({ player }, () => console.log("P:", this.state.player));
  }

  updateComputerState(computerObj) {
    const computer = { ...this.state.computer };
    computer.board = computerObj.board;
    computer.hp = computerObj.hp;
    this.setState({ computer }, () => console.log("C:", this.state.computer));
  }

  checkHitpoints(type) {
    const user = this.state[type];

    if (user.hp < 2) {
      this.gameOver(user);
    } else {
      user.hp--;
      this.setState({ [user]: user }, () => console.log(this.state[user]));
    }
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
          <Player
            type="p1"
            gameStarted={this.state.gameStarted}
            handlePlayerMove={this.handlePlayerMove}
            updateAlerts={this.updateAlerts}
            updatePlayerState={this.updatePlayerState}
            player={this.state.player}
          />
          <Computer
            gameStarted={this.state.gameStarted}
            gameOver={this.gameOver}
            handlePlayerMove={this.handlePlayerMove}
            updateAlerts={this.updateAlerts}
            player={this.state.player}
            computer={this.state.computer}
            updateComputerState={this.updateComputerState}
            checkHitpoints={this.checkHitpoints}
          />
        </div>
      </div>
    );
  }
}

export default App;
