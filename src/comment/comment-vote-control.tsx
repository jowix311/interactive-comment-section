import { Button, Grid, Typography, styled } from "@mui/material";
import IconPlus from "../assets/images/icon-plus.svg?react"; //NOTE yes we need the ?react in order to use the svg as a component
import IconMinus from "../assets/images/icon-minus.svg?react";

const VoteButton = styled(Button)(() => ({
  backgroundColor: "transparent",
  fontWeight: 700,
  minWidth: "auto",
  maxWidth: "48px",
}));

//NOTE: adding the "container" prop makes the flexbox work
//NOTE breakpoint .up means "min-width"
const VoteButtonContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  backgroundColor: theme.palette.grey[50],
  alignItems: "stretch", //items height 100%
  borderRadius: "6px",
  maxWidth: "120px",

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

const CommentVoteControl = () => {
  return (
    <VoteButtonContainer
      container
      alignItems="center"
      justifyContent="space-between"
    >
      <VoteButton aria-label="up vote comment">
        <IconPlus />
      </VoteButton>
      <VoteCount>12</VoteCount>
      <VoteButton aria-label="down vote comment">
        <IconMinus />
      </VoteButton>
    </VoteButtonContainer>
  );
};

export default CommentVoteControl;
