import CommentVoteControl from "./comment-vote-control";
import CommentMetaData from "./comment-meta-data";
import CommentReplyButton from "./comment-reply-button";
import { Box, styled } from "@mui/material";
import CommentContent from "./comment-content";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { upVoteComment } from "./comment.reducer";
import { useEffect } from "react";

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
  const { currentUser, comments } = useAppSelector((state) => state.comment);

  //TODO remove this when Redux is implemented
  const dispatch = useAppDispatch();

  const handleCommentUpVote = () => {
    //TODO dispatch upVoteComment
    dispatch(upVoteComment({ test: "test" }));
  };

  useEffect(() => {
    handleCommentUpVote();
  }, []);

  //NOTE We could add some loading UI on the future
  return (
    <>
      {comments.map(
        ({
          id,
          content,
          createdAt,
          score,
          user: {
            username,
            image: { png },
          },
        }) => (
          <CommentContainer key={id}>
            <Box sx={{ gridArea: "metadata" }}>
              <CommentMetaData
                profileImageSource={`../avatars/${png}`} //ideally image should be stored somewhere but for now we will use the public folder
                profileName={username}
                commentAge={createdAt}
                isOwnComment={currentUser.username === username}
              />
            </Box>
            <Box sx={{ gridArea: "comment" }}>
              <CommentContent commentText={content} />
            </Box>
            <Box sx={{ gridArea: "control" }}>
              <CommentVoteControl voteCount={score} />
            </Box>
            <Box sx={{ gridArea: "reply", textAlign: "right" }}>
              <CommentReplyButton />
            </Box>
          </CommentContainer>
        )
      )}
    </>
  );
};

export default Comment;

{
  /* {comment.replies.map((reply) => () => (
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
          ))} */
}
