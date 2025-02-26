import "./App.css";
import { useState } from "react";
import Home from "@/views/Home";
import GatherInformation from "@/views/GatherInformation";
import { useCreateFeedback } from "@/querys/index";
import Feedback from "@/views/Feedback";
import FeedbackSkeleton from "@/views/Feedback/FeedbackSkeleton";

function App() {
  const [showFeedbackAdviser, setShowFeedbackAdviser] = useState(false);
  const { mutate, data, isPending, reset } = useCreateFeedback();

  return !showFeedbackAdviser ? (
    <Home
      onStart={() => {
        setShowFeedbackAdviser(true);
      }}
    />
  ) : isPending ? (
    <FeedbackSkeleton />
  ) : data ? (
    <Feedback feedbackAdvice={data} onRestart={reset} />
  ) : (
    <GatherInformation onGetFeedback={mutate} />
  );
}

export default App;
