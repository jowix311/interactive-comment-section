import { Typography, styled } from "@mui/material";

//TODO maybe handle @ mentions - this seems tricky :

const CommentText = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.light,
  fontWeight: 500,
}));

interface CommentContentProps {
  commentText: string;
}

const CommentContent = ({ commentText }: CommentContentProps) => {
  return <CommentText>{commentText}</CommentText>;
};

export default CommentContent;
