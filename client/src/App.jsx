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
    this.handleRotateShips = this.handleRotateShips.bind(this);
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

  handleRotateShips() {
    let list = document.getElementById("outer-ship-container").classList;

    if (!list.contains("horizontal")) {
      list.add("horizontal");
    } else {
      list.remove("horizontal");
    }
  }

  placeShip(x, y, size, direction, user = "player") {
    let ship = document.querySelector(".ship-selected").parentNode;
    let board = this.state[user].board.slice();

    // Updates the matrix in state
    if (direction === "vertical") {
      for (let i = x; i < x + size; i++) {
        board[i][y] = size;
      }
    } else {
      for (let i = y; i < y + size; i++) {
        board[x][i] = size;
      }
    }

    // Updates the DOM to show ships on the board
    if (direction === "vertical") {
      for (let i = x; i < x + size; i++) {
        let grid = document.getElementById("p1-" + i + y);
        if (i === x) {
          grid.classList.add("head");
        } else if (i === x + size - 1) {
          grid.classList.add("tail");
        } else {
          grid.classList.add("body");
        }
      }
    } else {
      for (let i = y; i < y + size; i++) {
        let grid = document.getElementById("p1-" + x + i);
        if (i === y + size - 1) {
          grid.classList.add("head", "horizontal");
        } else if (i === y) {
          grid.classList.add("tail", "horizontal");
        } else {
          grid.classList.add("body", "horizontal");
        }
      }
    }

    ship.remove();
  }

  handleComputerMove() {
    const allSquares = document.querySelectorAll(
      ".square:not(.c1):not(.clicked)"
    );
    const square = allSquares[Math.floor(Math.random() * allSquares.length)];
    const [x, y] = square.id.split("-")[1];

    const move = this.state.player.board[x][y] === 0 ? "miss" : "hit";
    square.classList.add("clicked", move);

    if (move === "hit") {
      this.checkIfLost("player");
    }
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
