import React from "react";
import "./PickerSquare.scss";
import {ColorMatrix, Position} from "../../structures/geometry";
import {PICKER_SQUARE_SIZE, ZOOM_RECT_SIZE_PX, ZOOMED_PIXEL_SIZE} from "../../structures/constants";

export default function PickerSquare(props: {
  centerPosition: Position,
  targetColor: string,
  colorMatrix: ColorMatrix,
}) {

  const isTargetPixel = (i: number, j: number): boolean => {
    const targetIndex = Math.floor(ZOOM_RECT_SIZE_PX / 2);
    return i === targetIndex && j === targetIndex;
  }

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
        <i className="circle img"/>
        <i
          className="circle colored"
          style={{borderColor: props.targetColor}}
        />

        <i className="hint">
          <span>{props.targetColor}</span>
        </i>

        {props.colorMatrix.map((row: string[], i: number) => {
          return <div
            className="row"
            key={i}
            style={{
              height: `${ZOOMED_PIXEL_SIZE}px`,
              lineHeight: `${ZOOMED_PIXEL_SIZE}px`,
            }}
          >
            {row.map((color: string, j: number) => {
              return <div
                className={`px ${isTargetPixel(i, j) ? "target" : ""}`}
                key={j}
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
