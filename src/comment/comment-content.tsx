import { Typography, styled } from "@mui/material";

//TODO maybe handle @ mentions - this seems tricky :

const CommentText = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.light,
  fontWeight: 500,
}));

const CommentContent = () => {
  return (
    <CommentText>
      Impressive! Though it seems the drag feature could be improved.
    </CommentText>
  );
};

export default CommentContent;
