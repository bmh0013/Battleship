import React from "react";

class PlayerSquare extends React.Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.getCoordiantes = this.getCoordiantes.bind(this);
  }

  componentDidMount() {
    this.wrapper.current.addEventListener("click", this.getCoordiantes);
  }

  getCoordiantes() {
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
