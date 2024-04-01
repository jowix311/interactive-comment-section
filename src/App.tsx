import { Box, Button, styled } from "@mui/material";
import "./App.css"; // TODO maybe remove this

import Comment from "./comment/comment";

const MasterCommentContainer = styled(Box)(() => ({
  display: "grid",
  gap: "16px",
}));

function App() {
  return (
    <>
      <MasterCommentContainer>
        <Comment />
      </MasterCommentContainer>

      <h1>Test Test</h1>
      <Button variant="contained">Send</Button>
    </>
  );
}

export default App;
