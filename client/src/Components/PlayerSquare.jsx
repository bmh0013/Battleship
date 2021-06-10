import React from "react";

class PlayerSquare extends React.Component {
  constructor(props) {
    super(props);

    this.wrapper = React.createRef();
  }

  componentDidMount() {
    this.props.addSquareToMoves(this.wrapper.current);
  }

  render() {
    const { coordinates, placeShip } = this.props;
    return (
      <div
        ref={this.wrapper}
        className="square"
        coordinates={coordinates}
        onClick={placeShip}
      />
    );
  }
}

export default PlayerSquare;
