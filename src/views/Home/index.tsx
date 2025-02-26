import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useIsMobile from "@/hooks/useIsMobile";
import { Home as copyText } from "@/data/copy";

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
            {copyText.TITLE}
          </Typography>
          {isMobile ? null : (
            <Typography component={"p"} variant="h5" gutterBottom>
              {copyText.DESCRIPTION}
            </Typography>
          )}
        </Grid>
        <Grid textAlign={"center"}>
          <Button variant="contained" size="large" onClick={onStart}>
            {copyText.START_BUTTON}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Home;
