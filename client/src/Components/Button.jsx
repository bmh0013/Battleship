import React from "react";

const Button = ({ handleClick, type }) => {
  return (
    <button className="button" onClick={handleClick}>
      {type}
    </button>
  );
};

export default Button;
