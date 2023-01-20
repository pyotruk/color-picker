import React from "react";
import "./PickerSquare.scss";
import {ColorMatrix, Position} from "../../structures/geometry";
import {PICKER_SQUARE_SIZE, ZOOMED_PIXEL_SIZE} from "../../structures/constants";

export default function PickerSquare(props: {
  centerPosition: Position,
  colorMatrix: ColorMatrix,
}) {

  return (
    <div
      className="PickerSquare"
      style={{
        top: `${props.centerPosition.y - PICKER_SQUARE_SIZE / 2}px`,
        left: `${props.centerPosition.x - PICKER_SQUARE_SIZE / 2}px`,
      }}
    >
      <div
        className="zoom"
        style={{
          width: `${PICKER_SQUARE_SIZE}px`,
          height: `${PICKER_SQUARE_SIZE}px`,
        }}
      >
        <i/>

        {props.colorMatrix.map((row: string[], key: number) => {
          return <div
            className="row"
            key={key}
            style={{
              height: `${ZOOMED_PIXEL_SIZE}px`,
              lineHeight: `${ZOOMED_PIXEL_SIZE}px`,
            }}
          >
            {row.map((color: string, key: number) => {
              return <div
                className="px"
                key={key}
                style={{
                  backgroundColor: color,
                  width: `${ZOOMED_PIXEL_SIZE}px`,
                }}
              ></div>
            })}
          </div>;
        })}
      </div>
    </div>
  );
}
