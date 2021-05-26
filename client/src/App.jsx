import React from "react";
import Board from "./Components/Board.jsx";
import Button from "./Components/Button.jsx";
import Ship from "./Components/Ship.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
      board: new Array(10).fill(new Array(10).fill(0)),
    };

    this.handleStartGame = this.handleStartGame.bind(this);
    this.handleRotateShips = this.handleRotateShips.bind(this);
    this.selectShip = this.selectShip.bind(this);
    this.placeShip = this.placeShip.bind(this);
    this.handlePlayerMove = this.handlePlayerMove.bind(this);
  }

  handleStartGame() {
    this.setState({
      gameStarted: true,
    });
  }

  handleRotateShips() {
    let list = document.getElementById("outer-ship-container").classList;

    if (!list.contains("horizontal")) {
      document
        .getElementById("outer-ship-container")
        .classList.add("horizontal");
    } else {
      document
        .getElementById("outer-ship-container")
        .classList.remove("horizontal");
    }
  }

  placeShip(e) {
    let ship = document.querySelector(".ship-selected");
    let size = ship.getAttribute("size");

    document.querySelectorAll(".squares").forEach((sqr) => {
      sqr.removeEventListener("click", this.placeShip);
    });

    let type = e.target.id.split("-")[0];
    let [x, y] = e.target.id.split("-")[1];

    if (type === "p1" && this.state.board[+x][+y] === 0) {
      if (+x + +size <= 10) {
        for (let i = +x; i < +x + +size; i++) {
          console.log(i);
        }
      }
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
      sqr.addEventListener("click", this.placeShip);
    });
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
          <Ship
            size={5}
            placeShip={this.placeShip}
            selectShip={this.selectShip}
          />
          <Ship
            size={4}
            placeShip={this.placeShip}
            selectShip={this.selectShip}
          />
          <Ship
            size={3}
            placeShip={this.placeShip}
            selectShip={this.selectShip}
          />
          <Ship
            size={3}
            placeShip={this.placeShip}
            selectShip={this.selectShip}
          />
          <Ship
            size={2}
            placeShip={this.placeShip}
            selectShip={this.selectShip}
          />
        </div>
      </div>
    );
  }
}

export default App;
