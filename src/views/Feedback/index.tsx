import { useState } from "react";
import Markdown from "react-markdown";
import Grid from "@mui/material/Grid2";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Feedback as copyText } from "@/data/copy";

type Props = {
  feedbackAdvice: string;
  onRestart: () => void;
};
function Feedback({ feedbackAdvice, onRestart }: Props) {
  const [open, setOpen] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(feedbackAdvice);
      setOpen(true); // Show confirmation snackbar
    } catch (err) {
      console.error(copyText.COPY_ERROR, err);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid container maxWidth={800} padding={4}>
      <Grid size={12}>
        <Markdown>{feedbackAdvice}</Markdown>
      </Grid>

      <Grid size={12} container justifyContent={"space-around"}>
        <Tooltip title={copyText.COPY_BUTTON}>
          <IconButton onClick={handleCopy}>
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={copyText.RESTART_BUTTON}>
          <IconButton onClick={onRestart}>
            <RestartAltIcon />
          </IconButton>
        </Tooltip>
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success">
          {copyText.COPY_ALERT}
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default Feedback;
