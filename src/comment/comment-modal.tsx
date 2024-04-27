import { Box, Button, Grid, Modal, Typography, styled } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { deleteComment, hideCommentModal } from "./comment.reducer";

const ConfirmModal = styled(Modal)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const ConfirmModalBody = styled(Box)(() => ({
  backgroundColor: "white",
  maxWidth: "320px",
  height: "200px",
  padding: "16px",
  borderRadius: "8px",
}));

const GrayButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  color: "white",
  borderRadius: "6px",
  padding: "8px 16px",
  "&:hover": {
    backgroundColor: theme.palette.grey[50],
  },
}));

const RedButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: "white",
  borderRadius: "6px",
  padding: "8px 16px",
  "&:hover": {
    backgroundColor: theme.palette.error.light,
  },
}));

const ModalButtonContainer = styled(Grid)(() => ({
  display: "flex",
  gap: "16px",
}));

const CommentModal: React.FC = () => {
  const {
    commentModal: { isOpen },
  } = useAppSelector((state) => state.comment);

  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(hideCommentModal());
  };

  const handleDelete = () => {
    dispatch(deleteComment());
    dispatch(hideCommentModal());
  };

  return (
    <ConfirmModal
      open={isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ConfirmModalBody sx={{ backgroundColor: "white" }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Delete Comment
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </Typography>
        <ModalButtonContainer>
          <GrayButton onClick={handleCloseModal}>NO, CANCEL</GrayButton>
          <RedButton onClick={handleDelete}>YES, DELETE</RedButton>
        </ModalButtonContainer>
      </ConfirmModalBody>
    </ConfirmModal>
  );
};

export default CommentModal;
