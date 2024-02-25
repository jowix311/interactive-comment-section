import { Avatar, Grid, Typography, styled } from "@mui/material";

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

const CommentMetaData = ({
  profileImageSource,
  profileName,
  commentAge,
}: CommentMetaDataProps) => {
  console.log("profileImageSource", profileImageSource);
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
      <CommentAge>{commentAge}</CommentAge>
    </Grid>
  );
};

export default CommentMetaData;
