import { Button } from "@mui/material";
import "./App.css"; // TODO maybe remove this
import CommentVoteControl from "./components/comment-vote-control";

function App() {
  return (
    <>
      <CommentVoteControl />
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
