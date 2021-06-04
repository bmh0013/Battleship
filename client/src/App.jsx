import React from "react";
import PlayerBoard from "./Components/PlayerBoard.jsx";
import ComputerBoard from "./Components/ComputerBoard.jsx";
import Button from "./Components/Button.jsx";
import Ship from "./Components/Ship.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
      isWinner: null,
      player: {
        type: "player",
        board: this.createBoard(),
        hp: 17,
      },
    };

    this.startGame = this.startGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.selectShip = this.selectShip.bind(this);
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

  selectShip(e) {
    let selected = document.querySelectorAll(".ship-selected");
    let children = e.target.parentNode.childNodes;

    selected.forEach((ship) => {
      ship.classList.remove("ship-selected");
    });

    children.forEach((child) => {
      child.classList.add("ship-selected");
    });

    document.querySelectorAll(".square").forEach((sqr) => {
      sqr.addEventListener("click", this.getCoordiantes);
    });
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
        <div className="ship-container">ships</div>
      </div>
      /* <div className="button-container">
          <Button type="Start Game" handleClick={this.startGame} />
          <Button type="Reset Game" handleClick={this.handleResetGame} />
        </div>
        {this.state.isWinner !== null && (this.state.isWinner ? <div className="winner-winner"> You Won!!!</div> : <div className="winner-winner">Computer Won!</div>)}
        <div className="board-container">
          <Board
            type="p1"
            gameStarted={this.state.gameStarted}
            handlePlayerMove={this.handlePlayerMove}
          />
          <Board
            type="c1"
            gameStarted={this.state.gameStarted}
            handlePlayerMove={this.handlePlayerMove}
          />
        </div>
        <div className="rotate-ship-container">
          <div id="outer-ship-container">
            <Ship size={5} selectShip={this.selectShip} />
            <Ship size={4} selectShip={this.selectShip} />
            <Ship size={3} selectShip={this.selectShip} />
            <Ship size={3} selectShip={this.selectShip} />
            <Ship size={2} selectShip={this.selectShip} />
          </div>
          <Button type="Rotate Ships" handleClick={this.handleRotateShips} />
        </div> */
    );
  }
}

export default App;
