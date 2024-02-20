import { Button, Grid, SvgIcon, Typography, styled } from "@mui/material";
import IconPlus from "../assets/images/icon-plus.svg?react"; //NOTE yes we need the ?react in order to use the svg as a component

const VoteButton = styled(Button)(() => ({
  backgroundColor: "transparent",
  width: "auto",
  opacity: 0.5,
  fontWeight: 700,
}));

//NOTE: adding the "container" prop makes the flexbox work
//NOTE breakpoint .up means "min-width"
const VoteButtonContainer = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  flexDirection: "row",
  borderRadius: "6px",
  [theme.breakpoints.up("lg")]: {
    flexDirection: "column",
  },
}));

const VoteCount = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 700,
}));

const CommentVoteControl = () => {
  return (
    <VoteButtonContainer
      container
      alignItems="center"
      justifyContent="space-between"
    >
      <SvgIcon component={IconPlus}></SvgIcon>
      <VoteButton>+</VoteButton>
      <VoteCount>12</VoteCount>
      <VoteButton>-</VoteButton>
    </VoteButtonContainer>
  );
};

export default CommentVoteControl;
