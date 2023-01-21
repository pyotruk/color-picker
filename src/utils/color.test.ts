import {buildColorMatrix, getPixelHexColor} from "./color";

describe("getPixelHexColor", () => {
  const dummyPosition = {x: 0, y: 0};

  const ctxMock = {
    _mockData: [0, 0, 0, 0],
    getImageData: function (sx: number, sy: number, sw: number, sh: number) {
      return {data: this._mockData as any as Uint8ClampedArray};
    },
  };

  it("black", () => {
    ctxMock._mockData = [0, 0, 0, 0];
    expect(getPixelHexColor(ctxMock as any as CanvasRenderingContext2D, dummyPosition))
      .toBe("#000000");
  });

  it("white", () => {
    ctxMock._mockData = [255, 255, 255, 255];
    expect(getPixelHexColor(ctxMock as any as CanvasRenderingContext2D, dummyPosition))
      .toBe("#ffffff");
  });
});

it("buildColorMatrix", () => {
  const ctxMock = {
    getImageData: function (sx: number, sy: number, sw: number, sh: number) {
      return {
        data: [
          0, 0, 0, 0, 255, 255, 255, 255, // black, white
          255, 255, 255, 255, 0, 0, 0, 0, // white, black
        ] as any as Uint8ClampedArray,
      };
    },
  };

  const colorMatrix = buildColorMatrix(
    ctxMock as any as CanvasRenderingContext2D,
    {x: 0, y: 0},
    2,
  );

  expect(colorMatrix).toEqual([
    ["#000000", "#ffffff"],
    ["#ffffff", "#000000"],
  ]);
});
