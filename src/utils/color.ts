import {ColorMatrix, Position} from "../structures/geometry";

const RGBA_CHANNELS_NUMBER = 4; // bytes per pixel

const rgbToHex = (r: number, g: number, b: number) => {
  if (r > 255 || g > 255 || b > 255) {
    throw new Error("Invalid color component.");
  }
  return ((r << 16) | (g << 8) | b).toString(16);
};

const getPixelHexColorFromDataArray = (data: Uint8ClampedArray): string => {
  if (data.length !== RGBA_CHANNELS_NUMBER) {
    throw new Error("Invalid data array for a single pixel.");
  }
  return "#" + ("000000" + rgbToHex(data[0], data[1], data[2])).slice(-6);
};

export const getPixelHexColor = (ctx: CanvasRenderingContext2D, position: Position): string => {
  const imageData = ctx.getImageData(position.x, position.y, 1, 1).data;
  return getPixelHexColorFromDataArray(imageData);
};

export const buildColorMatrix = (
  ctx: null | undefined | CanvasRenderingContext2D,
  centerPosition: Position,
  zoomRectSizePx: number,
): ColorMatrix => {
  const matrix: ColorMatrix = [];
  if (!ctx) return matrix;

  const topLeftPosition = {
    x: centerPosition.x - zoomRectSizePx / 2,
    y: centerPosition.y - zoomRectSizePx / 2,
  };

  const imageData = ctx.getImageData(
    topLeftPosition.x,
    topLeftPosition.y,
    zoomRectSizePx,
    zoomRectSizePx,
  ).data;

  for (let i = 0; i < imageData.length; i += RGBA_CHANNELS_NUMBER) {
    if (i % (zoomRectSizePx * RGBA_CHANNELS_NUMBER) === 0) {
      matrix.push([]);
    }

    const pixelData = new Uint8ClampedArray(RGBA_CHANNELS_NUMBER);
    for (let j = 0; j < RGBA_CHANNELS_NUMBER; ++j) {
      pixelData[j] = imageData[i + j];
    }

    const color = getPixelHexColorFromDataArray(pixelData);
    matrix[matrix.length - 1].push(color);
  }
  return matrix;
};
