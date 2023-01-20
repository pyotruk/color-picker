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

  const [position, setPosition] = useState<Position>({x: 0, y: 0});

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

  // TODO consider size of the PickerSquare 120px
  const getPosition = (event: React.MouseEvent): Position => {
    if (!canvas.current) {
      return {x: 0, y: 0};
    }
    const clientRect = canvas.current.getBoundingClientRect();
    return {
      x: event.clientX - clientRect.left,
      y: event.clientY - clientRect.top,
    };
  }

  const handleMouseMove = _.throttle((event: React.MouseEvent) => {
    console.debug("throttle");
    if (!ctx.current) return;
    const position = getPosition(event);
    setPosition(position);
    props.setColor(getHexColor(ctx.current, position));
  }, 10);

  return (
    <div className="Canvas">
      <canvas id="canvas" onMouseMove={handleMouseMove}></canvas>
      <img id="img" src="/img.jpg" width="1920" height="1080"/>
      <PickerSquare
        position={position}
        colorMatrix={buildColorMatrix(ctx.current, position, ZOOM_RECT_SIZE_PX)}
      />
    </div>
  );
}
