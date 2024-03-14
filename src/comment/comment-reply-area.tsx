import { Button, Grid, TextareaAutosize, styled } from "@mui/material";
import { useRef } from "react";
import { Reply, Comment } from "./comment.reducer";

const MyTextArea = styled(TextareaAutosize)(({ theme }) => ({
  width: "100%",
  borderColor: theme.palette.primary.main,
  borderRadius: "8px",
  padding: "16px",
  "&:focus": {
    outline: "none",
  },
}));

//TODO Rename CommentReplyButton
const ReplyButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  textTransform: "none",
  "&:hover": { opacity: 0.5, backgroundColor: "transparent" },
}));

interface CommentReplyAreaProps {
  commentToReply: Comment | Reply;
  reply: Reply;
}

const CommentReplyArea = ({ commentToReply, reply }: CommentReplyAreaProps) => {
  //get value of textarea on click using ref
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const initialReplyValue = reply.isNewComment
    ? `@${commentToReply.user.username}`
    : "TODO: add here the message to update";
  //TODO remove console log
  console.log("commentToReply", commentToReply);
  console.log("reply", reply);
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    //TODO remove console log
    console.log(event.target.value);
    console.log("22", textAreaRef.current?.value);
  };
  //minRows will define the height of the textarea
  return (
    <Grid>
      <MyTextArea
        minRows={6}
        value={initialReplyValue}
        ref={textAreaRef}
        onChange={handleChange}
      />
      <ReplyButton>Reply</ReplyButton>
    </Grid>
  );
};

export default CommentReplyArea;
