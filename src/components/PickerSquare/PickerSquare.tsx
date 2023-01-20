import React from "react";
import "./PickerSquare.scss";
import {ColorMatrix, Position} from "../../structures/geometry";
import {PICKER_SQUARE_SIZE} from "../../structures/constants";

export default function PickerSquare(props: {
  centerPosition: Position,
  colorMatrix: ColorMatrix,
}) {

  return (
    <div
      className="PickerSquare"
      style={{
        width: `${PICKER_SQUARE_SIZE}px`,
        height: `${PICKER_SQUARE_SIZE}px`,
        top: `${props.centerPosition.y - PICKER_SQUARE_SIZE/2}px`,
        left: `${props.centerPosition.x - PICKER_SQUARE_SIZE/2}px`,
      }}
    >
      {props.colorMatrix.map((row: string[], key: number) => {
        return <div className="row" key={key}>
          {row.map((color: string, key: number) => {
            return <div
              className="px"
              key={key}
              style={{backgroundColor: color}}
            ></div>
          })}
        </div>;
      })}
    </div>
  );
}
