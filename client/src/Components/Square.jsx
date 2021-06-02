import React from "react";

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.getCoordiantes = this.getCoordiantes.bind(this);
  }

  componentDidMount() {
    this.wrapper.current.addEventListener('click', this.getCoordiantes);
  }

  getCoordiantes() {
    if (this.props.gameStarted) {
      let divSquare = this.wrapper.current;
      divSquare.removeEventListener('click', this.getCoordiantes);
      this.props.handlePlayerMove(divSquare.attributes.data.value);
    }
  }

  render() {
    let { coordinates } = this.props;
    coordinates = String(coordinates).padStart(2, 0);

    return (
      <div
        ref={this.wrapper}
        className={"square"}
        data={coordinates}
      />
    );
  }
}

export default Square;
