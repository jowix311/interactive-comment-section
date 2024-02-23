import { Button, styled } from "@mui/material";
import IconReply from "../assets/images/icon-reply.svg?react";

const ReplyButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  textTransform: "none",
  "&:hover": { opacity: 0.5, backgroundColor: "transparent" },
}));

const CommentReplyButton = () => {
  return (
    <>
      <ReplyButton startIcon={<IconReply />}>Reply</ReplyButton>
    </>
  );
};

export default CommentReplyButton;
