import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { FeedbackSkeleton as copyText } from "@/data/copy";

const FeedbackSkeleton = () => (
  <Box width={`90vw`} maxWidth={800}>
    <Typography variant="body1" gutterBottom>
      {copyText.LOADING_MESSAGE}
    </Typography>
    <Typography variant="h2" gutterBottom>
      <Skeleton width={"60%"} />
    </Typography>
    <Typography variant="body1" gutterBottom>
      <Skeleton />
    </Typography>
    <Typography variant="body1" gutterBottom>
      <Skeleton />
    </Typography>
    <Typography variant="body1" gutterBottom>
      <Skeleton />
    </Typography>
    <Typography variant="body1" gutterBottom>
      <Skeleton />
    </Typography>
    <Typography variant="body1" gutterBottom>
      <Skeleton />
    </Typography>
    <Typography variant="h3" gutterBottom>
      <Skeleton width={"60%"} />
    </Typography>
    <Typography variant="body1" gutterBottom>
      <Skeleton />
    </Typography>
    <Typography variant="body1" gutterBottom>
      <Skeleton />
    </Typography>
    <Typography variant="body1" gutterBottom>
      <Skeleton />
    </Typography>
  </Box>
);

export default FeedbackSkeleton;
