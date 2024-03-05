import CommentVoteControl from "./comment-vote-control";
import CommentMetaData from "./comment-meta-data";
import CommentReplyButton from "./comment-reply-button";
import { Box, styled } from "@mui/material";
import CommentContent from "./comment-content";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  upVoteComment,
  downVoteComment,
  Comment as CommentType,
  Reply as ReplyType,
} from "./comment.reducer";

const CommentContainer = styled(Box)(() => ({
  display: "grid",
  gap: "16px",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridTemplateRows: "auto",
  gridTemplateAreas: `"metadata metadata metadata"
    "comment comment comment"
    "control . reply"`,
  marginBottom: "16px",
  backgroundColor: "white",
  borderRadius: "8px",
  padding: "16px",
}));

const CommentSection = styled(Box)(() => ({}));

const CommentReplySection = styled(Box)(({ theme }) => ({
  borderLeft: `2px solid ${theme.palette.grey[50]}`,
  paddingLeft: "30px",
}));

//NOTE we only support one level of replies for now
const Comment = () => {
  const { currentUser, comments } = useAppSelector((state) => state.comment);

  const dispatch = useAppDispatch();

  const handleCommentUpVote = (commentId: number | string) => {
    dispatch(upVoteComment({ commentId: commentId }));
  };

  const handleCommentDownVote = (commentId: number | string) => {
    dispatch(
      downVoteComment({
        commentId: commentId,
      })
    );
  };

  // Prevent repeating codes for rendering parent comment  and replies
  const renderComment = (comment: CommentType | ReplyType) => {
    const {
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
    } = comment;
    return (
      <>
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
      </>
    );
  };

  //NOTE We could add some loading UI on the future
  return comments.map((comment: CommentType) => (
    <CommentSection as="section" key={comment.id}>
      <CommentContainer>{renderComment(comment)}</CommentContainer>
      {comment.replies.length > 1 && (
        <CommentReplySection as="section">
          {comment.replies.map((reply: ReplyType) => (
            <CommentContainer key={reply.id}>
              {renderComment(reply)}
            </CommentContainer>
          ))}
        </CommentReplySection>
      )}
    </CommentSection>
  ));
};

export default Comment;
