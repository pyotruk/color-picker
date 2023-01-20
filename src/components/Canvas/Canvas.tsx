import React, {useRef, useEffect, useState} from "react";
import _ from "lodash";
import "./Canvas.scss";
import PickerSquare from "./../PickerSquare/PickerSquare";
import {Position, Size} from "../../structures/geometry";
import {ZOOM_RECT_SIZE_PX} from "../../structures/constants";
import {buildColorMatrix, getPixelHexColor} from "../../utils/color";
import {convertViewportPositionToCanvasPosition} from "../../utils/position";

const ORIGINAL_IMG_SIZE: Size = {
  w: 1920,
  h: 1080,
}

export default function Canvas(props: {
  setColor: (color: string) => void,
}) {
  const canvas = useRef<HTMLCanvasElement>();
  const ctx = useRef<null | CanvasRenderingContext2D>();

  const [viewportPosition, setViewportPosition] = useState<Position>({x: 0, y: 0});
  const [canvasPosition, setCanvasPosition] = useState<Position>({x: 0, y: 0});

  const [color, setColor] = useState<string>("");

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

  const calcViewportPosition = (event: React.MouseEvent): Position => {
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
    if (!ctx.current || !canvas.current) return;

    const viewportPosition = calcViewportPosition(event);
    const canvasPosition = convertViewportPositionToCanvasPosition(canvas.current, viewportPosition);

    setViewportPosition(viewportPosition);
    setCanvasPosition(canvasPosition);

    const color = getPixelHexColor(ctx.current, canvasPosition);
    props.setColor(`${color}, Vx = ${viewportPosition.x}, Vy = ${viewportPosition.y}, Cx = ${canvasPosition.x}, Cy = ${canvasPosition.y}`);
    setColor(color);
  }, 25);

  return (
    <div className="Canvas">
      <canvas id="canvas" onMouseMove={handleMouseMove}></canvas>
      <img id="img" src="/img.jpg" width={ORIGINAL_IMG_SIZE.w} height={ORIGINAL_IMG_SIZE.h}/>
      <PickerSquare
        centerPosition={viewportPosition}
        targetColor={color}
        colorMatrix={buildColorMatrix(ctx.current, canvasPosition, ZOOM_RECT_SIZE_PX)}
      />
    </div>
  );
}
