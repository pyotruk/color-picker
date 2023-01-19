import React, {useState} from "react";
import Header from "./components/Header/Header";
import Canvas from "./components/Canvas/Canvas";

function App() {
  const [color, setColor] = useState<string>("");

  return (
    <div className="App">
      <Header color={color}/>
      <Canvas setColor={setColor}/>
    </div>
  );
}

export default App;
