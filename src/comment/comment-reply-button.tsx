import { Button, styled } from "@mui/material";
import IconReply from "../assets/images/icon-reply.svg?react";
import { User } from "./comment.reducer";

const ReplyButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  textTransform: "none",
  "&:hover": { opacity: 0.5, backgroundColor: "transparent" },
}));

interface CommentReplyButtonProps {
  commentId: number | string;
  handleReply: (commentId: number | string) => void;
  currentUser: User;
  commentReplyOwner: string;
}

const CommentReplyButton = ({
  commentId,
  handleReply,
  currentUser,
  commentReplyOwner,
}: CommentReplyButtonProps) => {
  return (
    <>
      {currentUser.username !== commentReplyOwner && (
        <ReplyButton
          startIcon={<IconReply />}
          onClick={() => handleReply(commentId)}
        >
          Reply
        </ReplyButton>
      )}
    </>
  );
};

export default CommentReplyButton;
