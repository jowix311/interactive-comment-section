import { Avatar, Box, Grid, Typography, styled } from "@mui/material";

interface CommentMetaDataProps {
  profileImageSource: string;
  profileName: string;
  isOwnComment: boolean;
  commentAge: string;
}

const ProfileName = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.secondary.light,
}));

const CommentAge = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.light,
}));

const ProfileBadge = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "white",
  padding: "4px 8px",
  fontWeight: 700,
  fontSize: "8px",
  textTransform: "uppercase",
}));

const CommentMetaData = ({
  profileImageSource,
  profileName,
  commentAge,
  isOwnComment,
}: CommentMetaDataProps) => {
  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      gap="16px"
      component="section"
    >
      <Avatar alt={profileName} src={profileImageSource} />
      <ProfileName>{profileName}</ProfileName>
      {isOwnComment && <ProfileBadge>you</ProfileBadge>}
      <CommentAge>{commentAge}</CommentAge>
    </Grid>
  );
};

export default CommentMetaData;
