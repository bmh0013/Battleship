import React from "react";

class Ship extends React.Component {
  componentDidMount() {
    this.wrapper = React.createRef();
  }

  render() {
    const { type, size, selectShip, direction } = this.props;
    const mapShip = new Array(size - 2).fill(0);
    const containerDirection = direction === 'vertical' ? 'horizontal' : 'vertical';
    const turn = direction === 'vertical' ? 'noturn' : 'turn';

    return (
      <div ref={this.wrapper} className={type + ' ' + containerDirection} size={size}>
        <div
          className={"ship head " + turn}
          onClick={() => {
            selectShip(this.wrapper.current);
          }}
        />
        {mapShip.map((ship, index) => {
          return (
            <div
              className={"ship body " + turn}
              key={index}
              onClick={() => {
                selectShip(this.wrapper.current);
              }}
            />
          );
        })}
        <div
          className={"ship tail " + turn}
          onClick={() => {
            selectShip(this.wrapper.current);
          }}
        />
      </div>
    );
  }
}

export default Ship;
