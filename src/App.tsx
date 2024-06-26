import { Box, styled } from "@mui/material";
import "./App.css"; // TODO maybe remove this

import Comment from "./comment/comment";
import CommentModal from "./comment/comment-modal";

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

      <CommentModal />
    </>
  );
}

export default App;
