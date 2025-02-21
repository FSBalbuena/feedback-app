import "./App.css";
import { useState } from "react";
import Home from "./views/Home";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  return isPlaying ? (
    <p>Playing</p>
  ) : (
    <Home
      onStart={() => {
        setIsPlaying(true);
      }}
    />
  );
}

export default App;
