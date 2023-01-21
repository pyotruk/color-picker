import {Position, Size} from "../structures/geometry";
import {ZOOM_RECT_SIZE_PX} from "../structures/constants";

export const convertViewportPositionToCanvasPosition = (
  canvas: HTMLCanvasElement,
  viewportPosition: Position,
): Position => {
  if (!canvas) return {x: 0, y: 0};

  const viewportSize: Size = {
    w: canvas.getBoundingClientRect().width,
    h: canvas.getBoundingClientRect().height,
  };

  const ratio: Position = {
    x: canvas.width / viewportSize.w,
    y: canvas.height / viewportSize.h,
  };

  return {
    x: ratio.x * viewportPosition.x,
    y: ratio.y * viewportPosition.y,
  };
};

export const isTargetPixel = (i: number, j: number): boolean => {
  const targetIndex = Math.floor(ZOOM_RECT_SIZE_PX / 2);
  return i === targetIndex && j === targetIndex;
};
