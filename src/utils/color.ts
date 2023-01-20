import {ColorMatrix, Position} from "../structures/geometry";

export const rgbToHex = (r: number, g: number, b: number) => {
  if (r > 255 || g > 255 || b > 255) {
    throw new Error("Invalid color component");
  }
  return ((r << 16) | (g << 8) | b).toString(16);
}

export const getHexColor = (ctx: CanvasRenderingContext2D, position: Position): string => {
  const colorData = ctx.getImageData(position.x, position.y, 1, 1).data;
  return "#" + ("000000" + rgbToHex(colorData[0], colorData[1], colorData[2])).slice(-6);
}

export const buildColorMatrix = (
  ctx: null | undefined | CanvasRenderingContext2D,
  centerPosition: Position,
  zoomRectSizePx: number,
) => {
  const matrix: ColorMatrix = [];
  if (!ctx) return matrix;

  const topLeftPosition = {
    x: centerPosition.x - zoomRectSizePx / 2,
    y: centerPosition.y - zoomRectSizePx / 2,
  }

  for (let i = 0; i < zoomRectSizePx; ++i) {
    let row = [];
    for (let j = 0; j < zoomRectSizePx; ++j) {
      row.push(getHexColor(ctx, {
        x: topLeftPosition.x + i,
        y: topLeftPosition.y + j,
      }));
    }
    matrix.push(row);
  }
  return matrix;
}
