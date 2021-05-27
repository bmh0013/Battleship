import React from "react";
import Board from "./Components/Board.jsx";
import Button from "./Components/Button.jsx";
import Ship from "./Components/Ship.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
      isWinner: false,
      player: {
        board: this.createBoard(),
        hp: 17,
      },
      computer: {
        board: this.createBoard(),
        hp: 17,
      },
    };

    this.handleStartGame = this.handleStartGame.bind(this);
    this.handleRotateShips = this.handleRotateShips.bind(this);
    this.selectShip = this.selectShip.bind(this);
    this.getCoordiantes = this.getCoordiantes.bind(this);
    this.handlePlayerMove = this.handlePlayerMove.bind(this);
    this.handleResetGame = this.handleResetGame.bind(this);
  }

  handleStartGame() {
    // Can maybe replace with a state that tracks # of ships left
    let shipsToPlace = document.querySelector('#outer-ship-container').children.length;

    if (!shipsToPlace) {
      this.setComputerBoard();

      this.setState({
        gameStarted: true,
      });
    }
  }

  handleResetGame() {
    window.location.reload(false);
  }

  setComputerBoard() {
    let board = this.state.computer.board.slice();
    let ships = [2, 3, 3, 4, 5]

    ships.forEach(ship => {
      this.placeComputerShips(ship, board)
    })
    console.log(board);
  }

  placeComputerShips(size, board) {
    let randomDirection = Math.floor(Math.random() * 2);
    let direction = ['horizontal', 'vertical'][randomDirection];

    if (direction === 'vertical') {
      let x = Math.floor(Math.random() * 9);
      let y = Math.floor(Math.random() * 10);
      if (this.checkValidPlacement(x, y, size, direction, 'computer')) {
        for (let i = x; i < x + size; i++) {
          board[i][y] = size;
        }
      } else {
        this.placeComputerShips(size, board);
      }
    } else {
      let x = Math.floor(Math.random() * 10);
      let y = Math.floor(Math.random() * 9);
      if (this.checkValidPlacement(x, y, size, direction, 'computer')) {
        for (let i = y; i < y + size; i++) {
          board[x][i] = size;
        }
      } else {
        this.placeComputerShips(size, board);
      }
    }

  }

  createBoard() {
    let board = [];
    for (let i = 0; i < 10; i++) {
      let row = [];
      for (let j = 0; j < 10; j++) {
        row.push(0)
      }
      board.push(row);
    }

    return board;
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

  placeShip(x, y, size, direction, user = 'player') {
    let ship = document.querySelector('.ship-selected').parentNode;
    let board = this.state[user].board.slice();

    // Updates the matrix in state
    if (direction === "vertical") {
      for (let i = x; i < x + size; i++) {
        board[i][y] = size
      }
    } else {
      for (let i = y; i < y + size; i++) {
        board[x][i] = size
      }
    }

    // Updates the DOM to show ships on the board
    if (direction === "vertical") {
      for (let i = x; i < x + size; i++) {
        let grid = document.getElementById('p1-' + i + y);
        if (i === x) {
          grid.classList.add('head')
        } else if (i === x + size - 1) {
          grid.classList.add('tail')
        } else {
          grid.classList.add('body')
        }
      }
    } else {
      for (let i = y; i < y + size; i++) {
        let grid = document.getElementById('p1-' + x + i);
        if (i === y + size - 1) {
          grid.classList.add('head', 'horizontal')
        } else if (i === y) {
          grid.classList.add('tail', 'horizontal')
        } else {
          grid.classList.add('body', 'horizontal')
        }
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

  checkValidPlacement(x, y, size, direction, user = 'player') {
    if (direction === "vertical") {
      if (x + size > 10) {
        return false;
      }

      for (let i = x; i < x + size; i++) {
        if (this.state[user].board[i][y] !== 0) {
          return false;
        }
      }
    } else {
      if (y + size > 10) {
        return false;
      }
      for (let i = y; i < y + size; i++) {
        if (this.state[user].board[x][i] !== 0) {
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
      let move = this.state.computer.board[x][y] === 0 ? "miss" : "hit";

      if (move === 'hit') {
        this.checkIfWinner('computer')
      }
      square.classList.add(move);
    }
  }

  checkIfWinner(user) {
    if (this.state.computer.hp < 2) {
      this.setState({
        isWinner: true,
        gameStarted: false,
      })

    } else {
      this.setState(prevState => {
        let computer = Object.assign({}, prevState[user]);
        computer.hp = computer.hp - 1;
        return { computer }
      })
    }
  }

  render() {
    return (
      <div className="app">
        <div className="button-container">
          <Button type="Start Game" handleClick={this.handleStartGame} />
          <Button type="Reset Game" handleClick={this.handleResetGame} />
        </div>
        {this.state.isWinner && <div className="winner-winner">You Won!!!</div>}
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
        </div>
      </div>
    );
  }
}

export default App;
