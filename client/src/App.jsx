import React from "react";
import Board from "./Components/Board.jsx";
import Button from "./Components/Button.jsx";
import Ship from "./Components/Ship.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
      board: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
    };

    this.handleStartGame = this.handleStartGame.bind(this);
    this.handleRotateShips = this.handleRotateShips.bind(this);
    this.selectShip = this.selectShip.bind(this);
    this.getCoordiantes = this.getCoordiantes.bind(this);
    this.handlePlayerMove = this.handlePlayerMove.bind(this);
  }

  handleStartGame() {
    // Can maybe replace with a state that tracks # of ships left
    let shipsToPlace = document.querySelector('#outer-ship-container').children.length;

    if (!shipsToPlace) {
      this.setState({
        gameStarted: true,
      });
    }
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

    document.querySelectorAll(".squares").forEach((sqr) => {
      sqr.addEventListener("click", this.getCoordiantes);
    });
  }

  placeShip(x, y, size, direction) {
    let ship = document.querySelector('.ship-selected').parentNode;
    let board = this.state.board.slice();

    if (direction === "vertical") {
      for (let i = x; i < x + size; i++) {
        board[i][y] = 1
      }
    } else {
      for (let i = y; i < y + size; i++) {
        board[x][i] = 1
      }
    }

    ship.remove()
  }

  getCoordiantes(e) {
    let ship = document.querySelector(".ship-selected");
    let direction = document.querySelector('#outer-ship-container').classList.contains("horizontal") ? "horizontal" : "vertical";
    let size = Number(ship.getAttribute("size"));

    document.querySelectorAll(".squares").forEach((sqr) => {
      sqr.removeEventListener("click", this.getCoordiantes);
    });

    let type = e.target.id.split("-")[0];
    let [x, y] = e.target.id.split("-")[1];

    if (type === "p1") {
      if (this.checkValidPlacement(+x, +y, size, direction)) {
        this.placeShip(+x, +y, size, direction)
      }
    }
  }

  checkValidPlacement(x, y, size, direction) {
    if (direction === "vertical") {
      if (x + size > 10) {
        return false;
      }

      for (let i = x; i < x + size; i++) {
        if (this.state.board[i][y] === 1) {
          return false;
        }
      }
    } else {
      if (y + size > 10) {
        return false;
      }
      for (let i = y; i < y + size; i++) {
        if (this.state.board[x][i] === 1) {
          return false;
        }
      }
    }

    return true;
  }

  handlePlayerMove(e, type) {
    let square = document.getElementById(e.target.id);

    if (
      !square.classList.contains("clicked") &&
      type === "c1" &&
      this.state.gameStarted
    ) {
      square.classList.add("clicked");

      let [x, y] = e.target.id.split("-")[1];
      let move = this.state.board[x][y] === 0 ? "miss" : "hit";
      square.classList.add(move);
    }
  }

  render() {
    return (
      <div className="app">
        <div className="button-container">
          <Button type="Start Game" handleClick={this.handleStartGame} />
          <Button type="Rotate Ships" handleClick={this.handleRotateShips} />
        </div>
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
        <div id="outer-ship-container">
          <Ship size={5} selectShip={this.selectShip} />
          <Ship size={4} selectShip={this.selectShip} />
          <Ship size={3} selectShip={this.selectShip} />
          <Ship size={3} selectShip={this.selectShip} />
          <Ship size={2} selectShip={this.selectShip} />
        </div>
      </div>
    );
  }
}

export default App;
