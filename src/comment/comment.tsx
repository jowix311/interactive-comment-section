import CommentVoteControl from "./comment-vote-control";
import CommentMetaData from "./comment-meta-data";
import CommentReplyButton from "./comment-reply-button";
import { Box, Grid, IconButton, styled } from "@mui/material";
import CommentContent from "./comment-content";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  upVoteComment,
  downVoteComment,
  prepareNewComment,
  Comment as CommentType,
  Reply as ReplyType,
  // deleteComment,
  prepareUpdateComment,
  showCommentModal,
} from "./comment.reducer";
import CommentReplyArea from "./comment-reply-area";
import IconDelete from "../assets/images/icon-delete.svg?react";
import IconEdit from "../assets/images/icon-edit.svg?react";

const CommentContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: "8px",
  padding: "16px",
  display: "grid",
  gap: "16px",
  gridTemplateColumns: "repeat(3, auto)",
  gridTemplateRows: "auto",
  gridTemplateAreas: `
  "metadata metadata metadata"
  "comment comment comment"
  "control reply  reply"`,

  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "min-content 1fr auto",
    gridTemplateAreas: `
    "control metadata reply"
    "control comment comment"
    "control  comment comment"`,
  },
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
  //paddingTop: "16px",
  display: "flex",
  justifyContent: "space-between",
}));

const CommentActionButton = styled(IconButton)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  fontSize: "16px",
  fontWeight: 700,
  // color: theme.palette.error.main,
  gap: "8px",
  ":hover": {
    opacity: 0.5,
  },
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

  const handleCommentDelete = (commentId: number | string) => {
    // dispatch(deleteComment({ commentId: commentId })); //keeping for reference
    dispatch(showCommentModal(commentId));
  };

  const handlePrepareComment = (commentId: number | string) => {
    dispatch(prepareUpdateComment({ commentId: commentId }));
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
        </CommentControlArea>
        <Box sx={{ gridArea: "reply", textAlign: "right" }}>
          <CommentReplyButton
            commentId={id}
            currentUser={currentUser}
            commentReplyOwner={username}
            handleReply={handleReply}
          />
          {currentUser.username === username && (
            <Box sx={{ gridArea: "actions" }}>
              <Grid>
                <CommentActionButton
                  disableRipple
                  color="error"
                  onClick={() => handleCommentDelete(comment.id)}
                >
                  <IconDelete />
                  Delete
                </CommentActionButton>
                <CommentActionButton
                  disableRipple
                  color="primary"
                  onClick={() => handlePrepareComment(comment.id)}
                >
                  <IconEdit />
                  Edit
                </CommentActionButton>
              </Grid>
            </Box>
          )}
        </Box>
      </>
    );
  };

  const renderCommentReply = (
    commentToReply: CommentType | ReplyType,
    reply: ReplyType
  ) => {
    //for EDIT
    if (reply.isNewComment && reply.createdAt) {
      //TODO add profile
      return (
        <CommentContainer sx={{ gridTemplateColumns: "1fr !important" }}>
          <CommentReplyArea commentToReply={commentToReply} reply={reply} />
        </CommentContainer>
      );
    }
    //for New Comment
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
