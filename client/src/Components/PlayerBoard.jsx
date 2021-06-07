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
      shipDirection: "vertical",
      ships: [
        { type: "carrier", size: 5, hp: 5 },
        { type: "battleship", size: 4, hp: 4 },
        { type: "cruiser", size: 3, hp: 3 },
        { type: "submarine", size: 3, hp: 3 },
        { type: "destroyer", size: 2, hp: 2 },
      ],
    };

    this.selectShip = this.selectShip.bind(this);
    this.rotateShips = this.rotateShips.bind(this);
    this.placePlayerShip = this.placePlayerShip.bind(this);
  }

  componentDidMount() {
    this.createBoard();
  }

  // Creates the board matrix used to show ship placement
  createBoard() {
    const board = [];
    for (let i = 0; i < 10; i++) {
      board.push(new Array(10).fill(0));
    }
    this.setState({ board });
  }

  // Adds border to ship to indicate it is selected
  // Removes border of current in case a new ship is selected before placement
  selectShip(ship) {
    if (this.state.currentShip) {
      this.state.currentShip.classList.remove("ship-selected");
    }

    ship.classList.add("ship-selected");
    this.setState({ currentShip: ship });
  }

  // Receives  coordinates, checks if valid, updates board, then removes current Ship
  placePlayerShip(coordinates, allSquares) {
    const size = this.state.currentShip.attributes.size.value;
    const [x, y] = coordinates;

    if (this.checkValidPlacement(+x, +y, +size)) {
      this.updateBoard(+x, +y, +size, allSquares);
      this.state.currentShip.remove();
      this.setState({ currentShip: null });
    }
  }

  // Updates the Matrix & DOM based on ship direction, places ship head on the selected square
  updateBoard(x, y, size, allSquares, direction = this.state.shipDirection) {
    const board = this.state.board;

    if (direction === "vertical") {
      for (let i = x; i < x + size; i++) {
        const coordinates = "" + i + y;
        board[i][y] = size;

        for (let j = 0; i < allSquares.length; j++) {
          if (allSquares[j].attributes.data.value === coordinates) {
            if (i === x) {
              allSquares[j].classList.add("head", direction);
            } else if (i === x + size - 1) {
              allSquares[j].classList.add("tail", direction);
            } else {
              allSquares[j].classList.add("body", direction);
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
              allSquares[j].classList.add("head", direction, 'turn');
            } else if (i === y + size - 1) {
              allSquares[j].classList.add("tail", direction, 'turn');
            } else {
              allSquares[j].classList.add("body", direction, 'turn');
            }
            break;
          }
        }
      }
    }
  }

  // Checks to see if the selected square is valid for placing ship by checking
  // if the size is within the bounds and there are no overlapping ships
  checkValidPlacement(x, y, size, direction = this.state.shipDirection) {
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

  rotateShips(e) {
    const shipDirection = this.state.shipDirection === "vertical" ? "horizontal" : "vertical";
    this.setState({ shipDirection });
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
        <div className="legend">
          <img
            alt="Rotate Ships"
            src="Rotate.png"
            className="rotate"
            onClick={this.rotateShips}
          />
          <div className={"ship-container " + this.state.shipDirection}>
            <Ships ships={this.state.ships} selectShip={this.selectShip}  direction={this.state.shipDirection} />
          </div>
        </div>
      </div>
    );
  }
}

export default PlayerBoard;
