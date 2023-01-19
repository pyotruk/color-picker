import React, { useState } from "react";
import "./Header.scss";

export default function Header() {
  const [color, setColor] = useState<string>("");

  return (
      <header>
        <i></i>
        <span>{ color }</span>
      </header>
  );
}
