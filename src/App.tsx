import "./App.css";
import { useState } from "react";
import Home from "@views/Home";
import GatherInformation from "@views/GatherInformation";
import { useCreateFeedback } from "@querys/index";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const { mutate, data, isPending } = useCreateFeedback();
  return isPlaying ? (
    <>
      <GatherInformation onGetFeedback={mutate as () => void} />
      {isPending ? "LOADING" : null}
      {data ? JSON.stringify(data) : null}
    </>
  ) : (
    <Home
      onStart={() => {
        setIsPlaying(true);
      }}
    />
  );
}

export default App;
