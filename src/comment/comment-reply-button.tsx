import { Button, styled } from "@mui/material";
import IconReply from "../assets/images/icon-reply.svg?react";

const ReplyButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  textTransform: "none",
  "&:hover": { opacity: 0.5, backgroundColor: "transparent" },
}));
//TODO There is a bug in the code that when you click reply button multiple times it will create multiple reply areas
interface CommentReplyButtonProps {
  commentId: number | string;
  handleReply: (commentId: number | string) => void;
}

const CommentReplyButton = ({
  commentId,
  handleReply,
}: CommentReplyButtonProps) => {
  return (
    <>
      <ReplyButton
        startIcon={<IconReply />}
        onClick={() => handleReply(commentId)}
      >
        Reply
      </ReplyButton>
    </>
  );
};

export default CommentReplyButton;
