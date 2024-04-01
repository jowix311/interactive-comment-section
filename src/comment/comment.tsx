import CommentVoteControl from "./comment-vote-control";
import CommentMetaData from "./comment-meta-data";
import CommentReplyButton from "./comment-reply-button";
import { Box, styled } from "@mui/material";
import CommentContent from "./comment-content";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  upVoteComment,
  downVoteComment,
  prepareNewComment,
  Comment as CommentType,
  Reply as ReplyType,
} from "./comment.reducer";
import CommentReplyArea from "./comment-reply-area";

const CommentContainer = styled(Box)(() => ({
  //TODO: revisit implementation
  // display: "grid",
  // gap: "16px",
  // gridTemplateColumns: "repeat(3, 1fr)",
  // gridTemplateRows: "auto",
  // gridTemplateAreas: `"metadata metadata metadata"
  //   "comment comment comment"
  //   "control . reply"`,
  // marginBottom: "16px",
  backgroundColor: "white",
  borderRadius: "8px",
  padding: "16px",
}));

const CommentSection = styled(Box)(() => ({
  display: "grid",
  gap: "16px",
}));

const CommentReplySection = styled(Box)(({ theme }) => ({
  borderLeft: `2px solid ${theme.palette.grey[50]}`,
  paddingLeft: "30px",
  display: "grid",
  gap: "16px",
}));

const CommentMetaDataArea = styled(Box)(() => ({
  paddingBottom: "16px",
}));

//two column grid
const CommentControlArea = styled(Box)(() => ({
  paddingTop: "16px",
  display: "flex",
  justifyContent: "space-between",
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

  const handleReply = (commentId: number | string) => {
    dispatch(prepareNewComment({ commentId: commentId }));
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
        <CommentMetaDataArea sx={{ gridArea: "metadata" }}>
          <CommentMetaData
            profileImageSource={`../avatars/${png}`} //ideally image should be stored somewhere but for now we will use the public folder
            profileName={username}
            commentAge={createdAt}
            isOwnComment={currentUser.username === username}
          />
        </CommentMetaDataArea>
        <Box sx={{ gridArea: "comment" }}>
          <CommentContent commentText={content} />
        </Box>
        <CommentControlArea sx={{ gridArea: "control" }}>
          <CommentVoteControl
            commentId={id}
            voteCount={score}
            hasUpVoted={hasUpVoted}
            hasDownVoted={hasDownVoted}
            handleUpVote={handleCommentUpVote}
            handleDownVote={handleCommentDownVote}
          />
          <Box sx={{ gridArea: "reply", textAlign: "right" }}>
            <CommentReplyButton
              commentId={id}
              currentUser={currentUser}
              commentReplyOwner={username}
              handleReply={handleReply}
            />
          </Box>
        </CommentControlArea>
      </>
    );
  };

  const renderCommentReply = (
    commentToReply: CommentType | ReplyType,
    reply: ReplyType
  ) => {
    if (reply.isNewComment) {
      return (
        <CommentContainer>
          <CommentReplyArea commentToReply={commentToReply} reply={reply} />
        </CommentContainer>
      );
    }

    return <CommentContainer>{renderComment(reply)}</CommentContainer>;
  };

  //NOTE We could add some loading UI on the future
  return comments.map((comment: CommentType) => (
    <CommentSection as="section" key={comment.id}>
      <CommentContainer>{renderComment(comment)}</CommentContainer>
      {comment.replies?.length > 0 && (
        <CommentReplySection as="section">
          {comment.replies.map((reply: ReplyType) => (
            <CommentSection as="section" key={reply.id}>
              {renderCommentReply(comment, reply)}
              <CommentReplySection>
                {reply.replies.map((childReply: ReplyType) => (
                  <Box key={childReply.id}>
                    {renderCommentReply(reply, childReply)}
                  </Box>
                ))}
              </CommentReplySection>
            </CommentSection>
          ))}
        </CommentReplySection>
      )}
    </CommentSection>
  ));
};

export default Comment;
