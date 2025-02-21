import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useIsMobile from "../../hooks/useIsMobile";
type Props = {
  onStart: () => void;
};
function Home({ onStart }: Props) {
  const isMobile = useIsMobile();
  return (
    <Grid
      container
      height={"100vh"}
      width={"100vw"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Grid
        container
        maxWidth="md"
        spacing={4}
        direction={"column"}
        size={{ xs: 10, md: 8 }}
      >
        <Grid textAlign={"center"}>
          <Typography variant={isMobile ? "h5" : "h3"} gutterBottom>
            Confidently give feedback that empowers others and strengthens
            relationships.
          </Typography>
          {isMobile ? null : (
            <Typography component={"p"} variant="h5" gutterBottom>
              If you’re feeling unsure, anxious, or stuck about delivering
              constructive feedback, this is the place to find clarity, tools,
              and support. Together, we’ll turn your fears into confidence and
              your feedback into a positive force for growth.
            </Typography>
          )}
        </Grid>
        <Grid textAlign={"center"}>
          <Button variant="contained" size="large" onClick={onStart}>
            Get Started
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Home;
