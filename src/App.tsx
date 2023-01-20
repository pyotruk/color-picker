import React, {useState} from "react";
import Header from "./components/Header/Header";
import Canvas from "./components/Canvas/Canvas";

function App() {
  const [color, setColor] = useState<string>("");
  const [isPicking, setIsPicking] = useState<boolean>(false);

  return (
    <div className="App">
      <Header color={color} toggleIsPicking={() => setIsPicking(!isPicking)}/>
      <Canvas
        isPicking={isPicking}
        setColor={(color: string) => {
          setColor(color);
          setIsPicking(false);
        }}
      />
    </div>
  );
}

export default App;
