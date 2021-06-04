import React from "react";
import PlayerSquare from "./PlayerSquare.jsx";

class PlayerBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "player",
      board: null,
      hp: 17,
    };

  }

  componentDidMount() {
    this.createBoard();
  }

  createBoard() {
    const board = [];

    for (let i = 0; i < 10; i++) {
      let row = [];
      for (let j = 0; j < 10; j++) {
        row.push(0);
      }
      board.push(row);
    }

    this.setState({ board });
  }

  render() {
    const { gameStarted } = this.props;
    let mapBoard = new Array(100).fill(0);

    return (
      <div className="board">
        {mapBoard.map((sqr, index) => (
          <PlayerSquare
            coordinates={index}
            key={index}
            gameStarted={gameStarted}
          />
        ))}
      </div>
    );
  }
}

export default PlayerBoard;
