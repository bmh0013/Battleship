import React from "react";
import Button from "./Components/Button.jsx";
import Player from "./Components/Player.jsx";
import Computer from "./Components/Computer.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
      alerts: "Place your ships",
      player: {
        board: [],
        hp: 17,
        currentShip: {},
        shipDirection: "vertical",
        ships: [
          { type: "carrier", size: 5, placed: false },
          { type: "battleship", size: 4, placed: false },
          { type: "cruiser", size: 3, placed: false },
          { type: "submarine", size: 3, placed: false },
          { type: "destroyer", size: 2, placed: false },
        ],
      },
      computer: {
        board: [],
        hp: 17,
        moves: [],
        ships: [
          { type: "carrier", size: 5, placed: false },
          { type: "battleship", size: 4, placed: false },
          { type: "cruiser", size: 3, placed: false },
          { type: "submarine", size: 3, placed: false },
          { type: "destroyer", size: 2, placed: false },
        ],
      },
    };

    this.startGame = this.startGame.bind(this);
    this.rotateShips = this.rotateShips.bind(this);
    this.selectShip = this.selectShip.bind(this);
    this.placeShip = this.placeShip.bind(this);
    this.playerMove = this.playerMove.bind(this);
    this.addSquareToMoves = this.addSquareToMoves.bind(this);
  }

  componentDidMount() {
    this.createBoards();
  }

  // Checks for any unplaced ships before starting game
  startGame() {
    const unplacedShips =
      document.querySelector(".ship-container").children.length;
    if (!unplacedShips) {
      this.setState({
        gameStarted: true,
        alerts: "You're turn",
      });
    } else {
      this.setState({
        alerts: `You must place all ships before starting`,
      });
    }
  }

  resetGame() {
    window.location.reload(false);
  }

  updateAlerts(message) {
    this.setState({ alerts: message });
  }

  // Creates the board matrixes for both player and computer
  createBoards(user) {
    const playerBoard = [];
    const computerBoard = [];
    while (playerBoard.length < 10) {
      playerBoard.push(new Array(10).fill(0));
      computerBoard.push(new Array(10).fill(0));
    }

    this.setState(
      (state) => {
        const { ships } = state.computer;

        ships.forEach((ship) => {
          this.placeComputerShip(ship, computerBoard);
        });

        state.player.board = playerBoard;
        state.computer.board = computerBoard;
        return state;
      },
      () => console.log(this.state.computer.board)
    );
  }

  // Updates shipDirection in player state
  rotateShips() {
    const { shipDirection } = this.state.player;
    this.setState((state) => {
      const turn = shipDirection === "vertical" ? "horizontal" : "vertical";
      state.player.shipDirection = turn;
      return state;
    });
  }

  // Updates currentShip in player state
  selectShip(ship) {
    const { ships } = this.state.player;

    for (let i = 0; i < ships.length; i++) {
      if (ships[i].type === ship) {
        this.setState((state) => {
          state.player.currentShip = ships[i];
          return state;
        });
      }
    }
  }

  // Receives  coordinates, checks if valid, updates board, then removes current Ship
  placeShip(e) {
    const { shipDirection, board } = this.state.player;
    const { size } = this.state.player.currentShip;
    const allSquares = e.target.parentNode.childNodes;
    let [x, y] = e.target.attributes.coordinates.value;

    if (size && this.checkValidPlacement(+x, +y, +size, board, shipDirection)) {
      if (shipDirection === "vertical") {
        for (let i = +x; i < +x + size; i++) {
          board[i][y] = size;
          const coor = Number(i + y);

          if (i === +x) {
            allSquares[coor].classList.add("head");
            continue;
          } else if (i === +x + size - 1) {
            allSquares[coor].classList.add("tail");
            continue;
          } else {
            allSquares[coor].classList.add("body");
            continue;
          }
        }
      } else {
        for (let j = +y; j < +y + size; j++) {
          board[x][j] = size;
          const coor = Number(x + j);

          if (j === +y) {
            allSquares[coor].classList.add("head", shipDirection, "turn");
            continue;
          } else if (j === +y + size - 1) {
            allSquares[coor].classList.add("tail", shipDirection, "turn");
            continue;
          } else {
            allSquares[coor].classList.add("body", shipDirection, "turn");
            continue;
          }
        }
      }

      this.setState((state) => {
        state.player.currentShip.placed = true;
        state.player.currentShip = {};
        return state;
      });
    }
  }

  // Checks to see if the selected square is valid for placing a ship by checking
  // if the size is within the bounds and there are no overlapping ships
  checkValidPlacement(x, y, size, board, direction) {
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


  // Handles when a player clicks a square on the computer board
  // Checks matrix for a hit or miss and updates the DOM accordingly
  playerMove(coordinates, divSquare) {
    if (this.state.gameStarted) {
      const [x, y] = coordinates;
      const move = this.state.computer.board[x][y] === 0 ? "miss" : "hit";

      if (move === "hit") {
        divSquare.classList.add(move);
        this.setState((state) => {
          const { hp } = state.computer;
          if (hp < 2) {
            state.alerts = "You won!";
            state.gameStarted = false;
          } else {
            state.alerts = "Hit!";
          }
          state.computer.hp = state.computer.hp - 1;
          return state;
        });
      } else {
        divSquare.classList.add(move);
        this.updateAlerts("Miss");
      }

      if (this.state.gameStarted) {
        this.computerMove();
      }
    }
  }

  // When buidling the playe board, adds a reference to the square in the moves list
  addSquareToMoves(square) {
    this.setState((state) => {
      state.computer.moves.push(square);
      return state;
    });
  }

  // Invokes after the player moves, randomly selects a square from the moves list
  computerMove() {
    this.setState((state) => {
      const { moves } = state.computer;
      const randomIdx = Math.floor(Math.random() * moves.length);
      const square = moves.splice(randomIdx, 1)[0];
      const [x, y] = square.attributes.coordinates.value;
      const move = state.player.board[x][y] !== 0 ? "hit" : "miss";

      square.classList.add(move);
      if (move === "hit") {
        const { hp } = state.player;
        if (hp < 2) {
          state.alerts = "You Lost :(";
          state.gameStarted = false;
        }
        state.player.hp = hp - 1;
      }
      return state;
    });
  }

  // Places computer ships randomly on the board
  placeComputerShip(ship, board) {
    const randomDirection = Math.floor(Math.random() * 2);
    const direction = ["horizontal", "vertical"][randomDirection];

    while (true) {
      if (direction === "vertical") {
        let x = Math.floor(Math.random() * 9);
        let y = Math.floor(Math.random() * 10);
        if (this.checkValidPlacement(x, y, ship.size, board, direction)) {
          for (let i = x; i < x + ship.size; i++) {
            board[i][y] = ship.size;
          }
          break;
        }
      } else {
        let x = Math.floor(Math.random() * 9);
        let y = Math.floor(Math.random() * 10);
        if (this.checkValidPlacement(x, y, ship.size, board, direction)) {
          for (let i = y; i < y + ship.size; i++) {
            board[x][i] = ship.size;
          }
          break;
        }
      }
    }
  }

  render() {
    return (
      <div className="app">
        <div className="button-container">
          <Button type="Start Game" handleClick={this.startGame} />
          <Button type="Reset Game" handleClick={this.resetGame} />
        </div>
        <div className="board-container">
          <Player
            gameStarted={this.state.gameStarted}
            player={this.state.player}
            computer={this.state.computer}
            rotateShips={this.rotateShips}
            selectShip={this.selectShip}
            placeShip={this.placeShip}
            addSquareToMoves={this.addSquareToMoves}
          />
          <Computer
            gameStarted={this.state.gameStarted}
            player={this.state.player}
            computer={this.state.computer}
            alerts={this.state.alerts}
            playerMove={this.playerMove}
          />
        </div>
      </div>
    );
  }
}

export default App;
