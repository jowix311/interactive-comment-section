import { Button, Grid, Typography, styled } from "@mui/material";
import "./App.css"; // TODO maybe remove this

const VoteButton = styled(Button)(({ theme }) => ({
  backgroundColor: "transparent",
  width: "auto",
  opacity: 0.5,
  fontWeight: 700,
}));

//NOTE: adding the "container" prop makes the flexbox work
//NOTE breakpoint .up means "min-width"
const VoteButtonContainer = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  flexDirection: "row",
  borderRadius: "6px",
  [theme.breakpoints.up("lg")]: {
    flexDirection: "column",
  },
}));

const VoteCount = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 700,
}));

function App() {
  return (
    <>
      <VoteButtonContainer
        container
        alignItems="center"
        justifyContent="space-between"
      >
        <VoteButton>+</VoteButton>
        <VoteCount>12</VoteCount>
        <VoteButton>-</VoteButton>
      </VoteButtonContainer>
      {/* <Grid container spacing={2}>
        <Grid xs={1}>yrf</Grid>
        <Grid xs={10}>
          <Paper>TEST</Paper>
        </Grid>
        <Grid xs={1}>
          <Paper>ZZ</Paper>
        </Grid>
      </Grid> */}
      <h1>Test Test</h1>
      <Button variant="contained">Send</Button>
    </>
  );
}

export default App;
