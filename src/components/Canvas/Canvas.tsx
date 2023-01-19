import React, { useRef, useEffect } from "react";
import "./Canvas.scss";

export default function Canvas(props: {
  setColor: (color: string) => void,
}) {
  const canvas = useRef<HTMLCanvasElement>();
  const ctx = useRef<null | CanvasRenderingContext2D>();

  const initCanvas = (): void => {
    canvas.current = document.getElementById("canvas") as HTMLCanvasElement;
    ctx.current = canvas.current.getContext("2d");
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

  const getMousePosition = (event: React.MouseEvent) => {
    const clientRect = canvas.current?.getBoundingClientRect();
    if (!clientRect) {
      throw new Error("clientRef is null.");
    }
    return {
      x: event.clientX - clientRect.left,
      y: event.clientY - clientRect.top,
    };
  }

  const handleMouseMove = (event: React.MouseEvent) => {
    const pos = getMousePosition(event);
    const color = `X = ${pos.x}, Y = ${pos.y}`;
    props.setColor(color);
  }

  return (
    <div className="Canvas">
      <canvas id="canvas" onMouseMove={handleMouseMove}></canvas>
      <img id="img" src="/img.jpg" width="1920" height="1080"/>
    </div>
  );
}
