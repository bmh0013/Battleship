import React from "react";
import PlayerSquare from "./PlayerSquare.jsx";
import Ships from "./Ships.jsx";

class PlayerBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "player",
      board: null,
      hp: 17,
      currentShip: null,
      ships: [
        { type: "carrier", size: 5, hp: 5 },
        { type: "battleship", size: 4, hp: 4 },
        { type: "cruiser", size: 3, hp: 3 },
        { type: "submarine", size: 3, hp: 3 },
        { type: "destroyer", size: 2, hp: 2 },
      ],
    };

    this.selectShip = this.selectShip.bind(this);
    this.placePlayerShip = this.placePlayerShip.bind(this);
  }

  componentDidMount() {
    this.createBoard();
  }

  createBoard() {
    const board = [];
    for (let i = 0; i < 10; i++) {
      board.push(new Array(10).fill(0));
    }
    this.setState({ board });
  }

  selectShip(ship) {
    if (this.state.currentShip) {
      this.state.currentShip.classList.remove("ship-selected");
    }

    ship.classList.add("ship-selected");
    this.setState({ currentShip: ship });
  }

  // Gathers coordinates, checks if valid, updates board, then removes current Ship
  placePlayerShip(coordinates, allSquares) {
    const size = this.state.currentShip.attributes.size.value;
    const [x, y] = coordinates;

    if (this.checkValidPlacement(+x, +y, +size)) {
      this.updateBoard(+x, +y, +size, allSquares);
      this.state.currentShip.remove();
      this.setState({ currentShip: null });
    }
  }

  // Updates the Matrix & DOM, places the ship head on the selected square
  updateBoard(x, y, size, allSquares, direction = "vertical") {
    const board = this.state.board;
    if (direction === "vertical") {
      for (let i = x; i < x + size; i++) {
        const coordinates = "" + i + y;
        board[i][y] = size;

        for (let j = 0; i < allSquares.length; j++) {
          if (allSquares[j].attributes.data.value === coordinates) {
            if (i === x) {
              allSquares[j].classList.add("head");
            } else if (i === x + size - 1) {
              allSquares[j].classList.add("tail");
            } else {
              allSquares[j].classList.add("body");
            }
            break;
          }
        }
      }
    } else {
      for (let i = y; i < y + size; i++) {
        const coordinates = "" + x + i;
        board[x][i] = size;

        for (let j = 0; i < allSquares.length; j++) {
          if (allSquares[j].attributes.data.value === coordinates) {
            if (i === y) {
              allSquares[j].classList.add("head");
            } else if (i === y + size - 1) {
              allSquares[j].classList.add("tail");
            } else {
              allSquares[j].classList.add("body");
            }
            break;
          }
        }
      }
    }
  }

  // Checks to see if the selected square is valid for placing ship by checking
  // if the size is within the bounds and there are no overlapping ships
  checkValidPlacement(x, y, size, direction = "vertical") {
    const board = this.state.board;
    if (direction === "vertical") {
      if (x + size > 10) {
        return false;
      }

      for (let i = x; i < x + size; i++) {
        if (board[i][y] !== 0) {
          return false;
        }
      }
    } else {
      if (y + size > 10) {
        return false;
      }
      for (let i = y; i < y + size; i++) {
        if (board[x][i] !== 0) {
          return false;
        }
      }
    }

    return true;
  }

  render() {
    const { gameStarted } = this.props;
    let mapBoard = new Array(100).fill(0);

    return (
      <div className="player-container">
        <div className="board">
          {mapBoard.map((sqr, index) => (
            <PlayerSquare
              coordinates={index}
              key={index}
              gameStarted={gameStarted}
              placePlayerShip={this.placePlayerShip}
              currentShip={this.state.currentShip}
            />
          ))}
        </div>
        <div className="ship-container">
          <Ships ships={this.state.ships} selectShip={this.selectShip} />
        </div>
      </div>
    );
  }
}

export default PlayerBoard;
