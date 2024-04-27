import { Box, Button, TextareaAutosize, styled } from "@mui/material";
import { useRef } from "react";
import { Reply, Comment, addComment } from "./comment.reducer";
import { useAppDispatch } from "../store/hooks";

const MyTextArea = styled(TextareaAutosize)(({ theme }) => ({
  width: "100%",
  borderColor: theme.palette.primary.main,
  borderRadius: "8px",
  padding: "16px",
  "&:focus": {
    outline: "none",
  },
  resize: "vertical",
}));

const MyTextAreaContainer = styled(Box)(() => ({}));

interface CommentReplyAreaProps {
  commentToReply: Comment | Reply;
  reply: Reply;
}

const CommentReplyArea = ({ commentToReply, reply }: CommentReplyAreaProps) => {
  const dispatch = useAppDispatch();
  //get value of textarea on click using ref
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  console.log("11", reply.createdAt);
  const initialReplyValue = reply.isNewComment
    ? !reply.createdAt
      ? `@${commentToReply.user.username} `
      : reply.content
    : "default value";

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    //TODO remove console log
    //TODO add logic to save on store
    console.log(event.target.value);
    console.log("22", textAreaRef.current?.value);
  };

  const handleCommentReply = () => {
    dispatch(
      addComment({
        commentId: reply.id,
        content: textAreaRef.current?.value ?? "", //reply button should be disabled on the first place to prevent passing an empty string
      })
    );
  };

  //minRows will define the height of the textarea
  return (
    <MyTextAreaContainer>
      <MyTextArea
        minRows={6}
        ref={textAreaRef}
        onChange={handleChange}
        defaultValue={initialReplyValue}
      />
      <Button variant="contained" onClick={handleCommentReply}>
        Reply
      </Button>
    </MyTextAreaContainer>
  );
};

export default CommentReplyArea;
