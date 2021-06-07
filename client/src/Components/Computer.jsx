import React from "react";
import ComputerSquare from "./ComputerSquare.jsx";

class Computer extends React.Component {
  constructor(props) {
    super(props);

    this.handlePlayerMove = this.handlePlayerMove.bind(this);
  }

  componentDidMount() {
    this.createBoard();
  }

  // Creates the board for the computer
  createBoard() {
    const board = [];
    const moves = [];
    const ships = [2, 3, 3, 4, 5];

    for (let i = 0; i < 10; i++) {
      board.push(new Array(10).fill(0));
      for (let j = 0; j < 10; j++) {
        moves.push(i + '' + j);
      }
    }

    ships.forEach((ship) => {
      this.placeComputerShip(ship, board);
    });

    this.props.computer.board = board;
    this.props.updateComputerState(this.props.computer);
    this.setState({moves})
  }

  // Chooses a random direction and square to place the head of the ship
  // If a overlapping or out of bounds it reruns the function using same ship
  placeComputerShip(ship, board) {
    let randomDirection = Math.floor(Math.random() * 2);
    let direction = ["horizontal", "vertical"][randomDirection];

    if (direction === "vertical") {
      let x = Math.floor(Math.random() * 9);
      let y = Math.floor(Math.random() * 10);
      if (this.checkValidPlacement(x, y, ship, direction, board)) {
        for (let i = x; i < x + ship; i++) {
          board[i][y] = ship;
        }
      } else {
        this.placeComputerShip(ship, board);
      }
    } else {
      let x = Math.floor(Math.random() * 10);
      let y = Math.floor(Math.random() * 9);
      if (this.checkValidPlacement(x, y, ship, direction, board)) {
        for (let i = y; i < y + ship; i++) {
          board[x][i] = ship;
        }
      } else {
        this.placeComputerShip(ship, board);
      }
    }
  }

  // Checks to see if the square is valid for placing ship by checking
  // if the size is within the bounds and there are no overlapping ships
  checkValidPlacement(x, y, ship, direction, board) {
    if (direction === "vertical") {
      if (x + ship > 10) {
        return false;
      }

      for (let i = x; i < x + ship; i++) {
        if (board[i][y] !== 0) {
          return false;
        }
      }
    } else {
      if (y + ship > 10) {
        return false;
      }
      for (let i = y; i < y + ship; i++) {
        if (board[x][i] !== 0) {
          return false;
        }
      }
    }

    return true;
  }

  // Handles when a player clicks a square on the computer board
  // Checks matrix for a hit or miss and updates the DOM accordingly
  handlePlayerMove(coordinates, divSquare) {
    const [x, y] = coordinates;
    const move = this.props.computer.board[x][y] === 0 ? "miss" : "hit";

    if (move === "hit") {
      divSquare.classList.add("hit");
      this.props.checkHitpoints('computer')
    } else {
      divSquare.classList.add("miss");
      this.props.updateAlerts('Miss');
    }

    if (this.props.gameStarted) {
      this.handleComputerMove();
    }
  }

  handleComputerMove() {
    const board = this.props.player.board;
    const moves = this.props.computer.moves;
    const square = moves.splice(Math.floor(Math.random() * moves.length), 1)[0];
    const [x, y] = square.attributes.data.value;


    if (board[x][y] !== 0) {
      square.classList.add('hit');
      this.props.checkHitpoints('player')
    } else {
      square.classList.add('miss');
    }
  }

  render() {
    const { gameStarted } = this.props;
    let mapBoard = new Array(100).fill(0);

    return (
      <div className="computer-container">
        <div className="board">
          {mapBoard.map((sqr, index) => (
            <ComputerSquare
              coordinates={index}
              key={index}
              handlePlayerMove={this.handlePlayerMove}
              gameStarted={gameStarted}
            />
          ))}
        </div>
        <div className="legend" />
      </div>
    );
  }
}

export default Computer;
