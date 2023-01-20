import React, {useRef, useEffect, useState} from "react";
import _ from "lodash";
import "./Canvas.scss";
import PickerSquare from "./../PickerSquare/PickerSquare";
import {Position} from "../../structures/geometry";
import {ZOOM_RECT_SIZE_PX} from "../../structures/constants";
import {buildColorMatrix, getHexColor} from "../../utils/color";

export default function Canvas(props: {
  setColor: (color: string) => void,
}) {
  const canvas = useRef<HTMLCanvasElement>();
  const ctx = useRef<null | CanvasRenderingContext2D>();

  const [centerPosition, setCenterPosition] = useState<Position>({x: 0, y: 0});

  const initCanvas = (): void => {
    canvas.current = document.getElementById("canvas") as HTMLCanvasElement;
    ctx.current = canvas.current.getContext("2d", {willReadFrequently: true});
    if (!ctx.current) {
      alert("Failed to init canvas.");
    }
  }

  const drawImage = (): void => {
    if (!ctx.current) {
      return;
    }
    const img = document.getElementById("img") as HTMLImageElement;
    ctx.current.canvas.width = img.width;
    ctx.current.canvas.height = img.height;

    img.onload = () => {
      ctx.current?.drawImage(img, 0, 0);
    }
  }

  useEffect(() => {
    initCanvas();
    drawImage();
  }, []);

  const calcCenterPosition = (event: React.MouseEvent): Position => {
    if (!canvas.current) {
      return {x: 0, y: 0};
    }
    const clientRect = canvas.current.getBoundingClientRect();
    return {
      x: event.clientX - clientRect.left,
      y: event.clientY - clientRect.top,
    };
  }

  const handleMouseMove = _.throttle((event: React.MouseEvent): void => {
    if (!ctx.current) return;
    const position = calcCenterPosition(event);
    setCenterPosition(position);
    const color = getHexColor(ctx.current, position);
    props.setColor(`${color}, X = ${position.x}, Y = ${position.y}`);
  }, 10);

  return (
    <div className="Canvas">
      <canvas id="canvas" onMouseMove={handleMouseMove}></canvas>
      <img id="img" src="/img.jpg" width="1920" height="1080"/>
      <PickerSquare
        centerPosition={centerPosition}
        colorMatrix={buildColorMatrix(ctx.current, centerPosition, ZOOM_RECT_SIZE_PX)}
      />
    </div>
  );
}
