import React from "react";

class Ship extends React.Component {
  componentDidMount() {
    this.wrapper = React.createRef();
  }

  render() {
    const { type, size, selectShip } = this.props;
    const mapShip = new Array(size - 2).fill(0);

    return (
      <div ref={this.wrapper} className={type} size={size}>
        <div
          className={"ship head"}
          onClick={() => {
            selectShip(this.wrapper.current);
          }}
        />
        {mapShip.map((ship, index) => {
          return (
            <div
              className={"ship body"}
              key={index}
              onClick={() => {
                selectShip(this.wrapper.current);
              }}
            />
          );
        })}
        <div
          className={"ship tail"}
          onClick={() => {
            selectShip(this.wrapper.current);
          }}
        />
      </div>
    );
  }
}

export default Ship;
