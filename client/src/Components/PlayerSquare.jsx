import React from "react";

class PlayerSquare extends React.Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.getCoordinates = this.getCoordinates.bind(this);
  }

  componentDidMount() {
    this.wrapper.current.addEventListener("click", this.getCoordinates);
  }

  // Gathers the coordinates from the selected div
  // Passes array of all squares in order to place player ship
  getCoordinates() {
    if (this.props.currentShip) {
      let divSquare = this.wrapper.current;
      this.props.placePlayerShip(divSquare.attributes.data.value, divSquare.parentNode.childNodes);
    }
  }

  render() {
    let { coordinates } = this.props;
    coordinates = String(coordinates).padStart(2, 0);

    return <div ref={this.wrapper} className={"square"} data={coordinates} />;
  }
}

export default PlayerSquare;
