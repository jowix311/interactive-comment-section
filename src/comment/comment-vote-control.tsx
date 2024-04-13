import { Button, Grid, Typography, styled } from "@mui/material";
import IconPlus from "../assets/images/icon-plus.svg?react"; //NOTE yes we need the ?react in order to use the svg as a component
import IconMinus from "../assets/images/icon-minus.svg?react";

interface CommentVoteControlProps {
  commentId: number | string;
  commentParentId?: number | string;
  voteCount: number;
  hasUpVoted: boolean;
  hasDownVoted: boolean;
  handleUpVote: (commentId: number | string) => void;
  handleDownVote: (commentId: number | string) => void;
}

const VoteButton = styled(Button)(() => ({
  backgroundColor: "transparent",
  fontWeight: 700,
  minWidth: "auto",
  maxWidth: "48px",
  opacity: 0.5,
  "&:hover": {
    opacity: 1,
  },
}));

//NOTE: adding the "container" prop makes the flexbox work
//NOTE breakpoint .up means "min-width"
const VoteButtonContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  backgroundColor: theme.palette.grey[50],
  alignItems: "stretch", //items height 100%
  borderRadius: "6px",
  maxWidth: "86px",

  [theme.breakpoints.up("lg")]: {
    flexDirection: "column",
  },
}));

const VoteCount = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 700,
  alignSelf: "center",
  padding: "8px 0 8px 0",
}));

const CommentVoteControl = ({
  commentId,
  voteCount,
  hasUpVoted,
  hasDownVoted,
  handleUpVote,
  handleDownVote,
}: CommentVoteControlProps) => {
  return (
    <VoteButtonContainer
      container
      alignItems="center"
      justifyContent="space-between"
    >
      <VoteButton
        aria-label="up vote comment"
        disabled={hasUpVoted}
        onClick={() => handleUpVote(commentId)}
      >
        <IconPlus />
      </VoteButton>
      <VoteCount>{voteCount}</VoteCount>
      <VoteButton
        aria-label="down vote comment"
        disabled={hasDownVoted}
        onClick={() => handleDownVote(commentId)}
      >
        <IconMinus />
      </VoteButton>
    </VoteButtonContainer>
  );
};

export default CommentVoteControl;
