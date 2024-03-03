import CommentVoteControl from "./comment-vote-control";
import CommentMetaData from "./comment-meta-data";
import CommentReplyButton from "./comment-reply-button";
import { Box, styled } from "@mui/material";
import CommentContent from "./comment-content";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { upVoteComment, downVoteComment } from "./comment.reducer";

const CommentContainer = styled(Box)(() => ({
  display: "grid",
  gap: "16px",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridTemplateRows: "auto",
  gridTemplateAreas: `"metadata metadata metadata"
    "comment comment comment"
    "control . reply"`,
}));
//NOTe we only handle one level of replies for now
const Comment = () => {
  const { currentUser, comments } = useAppSelector((state) => state.comment);

  //TODO remove this when Redux is implemented
  const dispatch = useAppDispatch();

  const handleCommentUpVote = (commentId: number | string) => {
    dispatch(upVoteComment({ commentId: commentId }));
  };

  const handleCommentDownVote = (commentId: number | string) => {
    dispatch(downVoteComment({ commentId: commentId }));
  };

  //NOTE We could add some loading UI on the future
  return (
    <>
      {comments.map(
        ({
          id,
          content,
          createdAt,
          score,
          hasUpVoted,
          hasDownVoted,
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
              <CommentVoteControl
                commentId={id}
                voteCount={score}
                hasUpVoted={hasUpVoted}
                hasDownVoted={hasDownVoted}
                handleUpVote={handleCommentUpVote}
                handleDownVote={handleCommentDownVote}
              />
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
