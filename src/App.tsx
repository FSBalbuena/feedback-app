import "./App.css";
import { useState } from "react";
import Home from "./views/Home";
import GatherInformation from "./views/GatherInformation";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  return isPlaying ? (
    <GatherInformation />
  ) : (
    <Home
      onStart={() => {
        setIsPlaying(true);
      }}
    />
  );
}

export default App;
