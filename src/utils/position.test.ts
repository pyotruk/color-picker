import {convertViewportPositionToCanvasPosition, isTargetPixel} from "./position";
import {Position} from "../structures/geometry";

it("convertViewportPositionToCanvasPosition", () => {
  const canvasMock = {
    getBoundingClientRect: () => ({width: 20, height: 10}),
    width: 40,
    height: 20,
  } as HTMLCanvasElement;

  const viewportPosition = {x: 10, y: 5};

  const canvasPosition: Position = convertViewportPositionToCanvasPosition(canvasMock, viewportPosition);

  expect(canvasPosition.x).toBe(20);
  expect(canvasPosition.y).toBe(10);
});

it("isTargetPixel", () => {
  expect(isTargetPixel(10, 10)).toBe(true);
  expect(isTargetPixel(11, 10)).toBe(false);
  expect(isTargetPixel(11, 11)).toBe(false);
});
