import React from "react";

class PlayerSquare extends React.Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
  }

  componentDidMount() {
    console.log(this.props);
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

export default PlayerSquare;
