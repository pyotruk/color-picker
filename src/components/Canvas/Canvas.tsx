import React, { useEffect } from "react";
import "./Canvas.scss";

export default function Canvas() {
  let ctx: null | CanvasRenderingContext2D;

  const initCanvas = (): void => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    ctx = canvas?.getContext("2d");
    if (!ctx) {
      alert("Failed to init canvas.");
    }
  }

  const drawImage = (): void => {
    if (!ctx) {
      return;
    }
    const img = document.getElementById("img") as HTMLImageElement;
    ctx.canvas.width = img.width;
    ctx.canvas.height = img.height;
    img.onload = () => ctx?.drawImage(img, 0, 0);
  }

  useEffect(() => {
    initCanvas();
    drawImage();
  }, []);

  return (
    <div className="Canvas">
      <canvas id="canvas"></canvas>
      <img id="img" src="/img.jpg" width="1920" height="1080"/>
    </div>
  );
}
