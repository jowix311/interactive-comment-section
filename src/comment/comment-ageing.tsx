import { Typography, styled } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
type CommentAgeingProps = {
  commentAge: string;
};

const CommentAge = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.light,
}));

const CommentAgeing: React.FC<CommentAgeingProps> = ({ commentAge }) => {
  const commentDate = new Date(commentAge);
  const dayDifference = formatDistanceToNow(commentDate);

  return <CommentAge>{dayDifference}</CommentAge>;
};

export default CommentAgeing;
