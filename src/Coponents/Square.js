import React from "react";

function Square(props) {
  return (
    <div
      onClick={props.onClick}
      className="square"
      style={{
        border: "1px solid black",
        height: "100px",
        width: "60%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <h5>{props.value}</h5>
    </div>
  );
}

export default Square;
