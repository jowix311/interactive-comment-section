import CommentVoteControl from "./comment-vote-control";
import CommentMetaData from "./comment-meta-data";
import CommentReplyButton from "./comment-reply-button";

//TODO remove this image when Redux is implemented, this is just a placeholder so we can see the avatar
import imageAmy from "../assets/images/avatars/image-amyrobson.png";

import { Box, styled } from "@mui/material";
import CommentContent from "./comment-content";

const CommentContainer = styled(Box)(() => ({
  display: "grid",
  gap: "16px",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridTemplateRows: "auto",
  gridTemplateAreas: `"metadata metadata metadata"
    "comment comment comment"
    "control . reply"`,
}));

const Comment = () => {
  //TODO refactor this to use a prop and remove the dummy data
  const dummyProfile = {
    profileImageSource: imageAmy,
    profileName: "amyrobson",
    isOwnComment: false,
    commentAge: "1 week ago",
  };

  return (
    <>
      <CommentContainer>
        <Box sx={{ gridArea: "metadata" }}>
          <CommentMetaData {...dummyProfile} />
        </Box>
        <Box sx={{ gridArea: "comment" }}>
          <CommentContent />
        </Box>
        <Box sx={{ gridArea: "control" }}>
          <CommentVoteControl />
        </Box>
        <Box sx={{ gridArea: "reply", textAlign: "right" }}>
          <CommentReplyButton />
        </Box>
      </CommentContainer>
    </>
  );
};

export default Comment;
