import React from "react";
import "./PickerSquare.scss";

const SIZE = 120; // px

export default function PickerSquare(props: {
  x: number,
  y: number,
}) {

  return (
    <div
      className="PickerSquare"
      style={{
        width: `${SIZE}px`,
        height: `${SIZE}px`,
        top: `${props.y - SIZE/2}px`,
        left: `${props.x - SIZE/2}px`,
      }}
    >
    </div>
  );
}
