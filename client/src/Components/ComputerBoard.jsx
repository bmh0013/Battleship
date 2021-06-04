import React from "react";
import Square from "./Square.jsx";

class ComputerBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "computer",
      board: null,
      hp: 17,
    };

    this.handlePlayerMove = this.handlePlayerMove.bind(this);
  }

  componentDidMount() {
    this.createBoard();
  }

  createBoard() {
    const board = [];
    const ships = [2, 3, 3, 4, 5];

    for (let i = 0; i < 10; i++) {
      let row = [];
      for (let j = 0; j < 10; j++) {
        row.push(0);
      }
      board.push(row);
    }

    ships.forEach((ship) => {
      this.placeComputerShip(ship, board);
    });

    this.setState({ board }, () => console.log(this.state.board));
  }

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

  handlePlayerMove(coordinates, divSquare) {
    const [x, y] = coordinates;
    const move = this.state.board[x][y] === 0 ? "miss" : "hit";

    if (move === "hit") {
      divSquare.classList.add("hit");
    } else {
      divSquare.classList.add("miss");
    }

    if (move === "hit") {
      if (this.state.hp < 2) {
        this.props.gameOver('player')
      } else {
        let hp = this.state.hp - 1;
        this.setState({ hp }, () => console.log(this.state.hp));
      }
    }
  }

  render() {
    const { gameStarted } = this.props;
    let mapBoard = new Array(100).fill(0);

    return (
      <div className="board">
        {mapBoard.map((sqr, index) => (
          <Square
            coordinates={index}
            key={index}
            handlePlayerMove={this.handlePlayerMove}
            gameStarted={gameStarted}
          />
        ))}
      </div>
    );
  }
}

export default ComputerBoard;
