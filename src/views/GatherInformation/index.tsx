import Grid from "@mui/material/Grid2";
import { useCallback, useState } from "react";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import GetAppIcon from "@mui/icons-material/GetApp";
import Typography from "@mui/material/Typography";
import { steps } from "@data/steps";
import { GatherInformation as copyText } from "@data/copy";

type Answers = { [key: string]: string };

type Props = {
  onGetFeedback: (answers: Answers) => void;
};
function GatherInformation({ onGetFeedback }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [currentAnswer, setCurrentAnswer] = useState("");

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const saveAnswer = useCallback(() => {
    const answerId = steps[currentStep].id;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [answerId]: currentAnswer,
    }));
  }, [currentStep, currentAnswer]);

  const onAnswerChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentAnswer(event.target.value);
    },
    []
  );

  const onMoveToAnswer = useCallback(
    (nextStepIndex: number) => {
      const moveToAnswer = answers[steps[nextStepIndex]?.id];
      saveAnswer();
      setCurrentAnswer(moveToAnswer || "");
    },
    [saveAnswer, answers]
  );

  //--- Buttons Actions ---//
  const onNext = useCallback(() => {
    onMoveToAnswer(currentStep + 1);
    setCurrentStep((previousCurrentStep) => previousCurrentStep + 1);
  }, [onMoveToAnswer, currentStep]);

  const onPrev = useCallback(() => {
    onMoveToAnswer(currentStep - 1);
    setCurrentStep((previousCurrentStep) => previousCurrentStep - 1);
  }, [onMoveToAnswer, currentStep]);

  const handleFeedbackSubmit = () => {
    const answerId = steps[currentStep].id;
    const newAnswers = { ...answers, [answerId]: currentAnswer };
    setAnswers(newAnswers);
    onGetFeedback(newAnswers);
  };
  //--- END Buttons Actions ---//

  return (
    <Grid container spacing={2} maxWidth={800} padding={4}>
      <Grid size={12}>
        <Typography variant={"h4"} gutterBottom>
          {steps[currentStep].question}
        </Typography>
        <Typography variant={"body1"} component={"p"} gutterBottom>
          {steps[currentStep].hint}
        </Typography>
      </Grid>
      <Grid size={12}>
        <TextField
          label={copyText.TEXT_FIELD_LABEL}
          value={currentAnswer}
          onChange={onAnswerChange}
          multiline
          fullWidth
          minRows={4}
          maxRows={6}
        />
      </Grid>
      <Grid size={12} container justifyContent={"space-around"}>
        <Tooltip title={copyText.PREV_BUTTON}>
          <IconButton disabled={isFirstStep} onClick={onPrev}>
            <ArrowBackIos />
          </IconButton>
        </Tooltip>

        {isLastStep ? (
          <Tooltip title={copyText.GET_FEEDBACK_BUTTON}>
            <IconButton
              disabled={!currentAnswer}
              onClick={handleFeedbackSubmit}
            >
              <GetAppIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title={copyText.NEXT_BUTTON}>
            <IconButton disabled={!currentAnswer} onClick={onNext}>
              <ArrowForwardIos />
            </IconButton>
          </Tooltip>
        )}
      </Grid>
    </Grid>
  );
}

export default GatherInformation;
