import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  deleteCommentById,
  handleCommentVote,
  prepareCommentForUpdate,
  prepareNewCommentById,
  updateCommentById,
} from "./comment-utils";

//NOTE The types for initial state where generated by Github AI cool!
export type User = {
  image: {
    png: string;
    webp: string;
  };
  username: string;
};

export type Reply = {
  id: number | string;
  content: string;
  createdAt: string;
  score: number;
  hasUpVoted: false;
  hasDownVoted: false;
  replyingTo: string;
  user: User;
  replies: Reply[];
  isNewComment: boolean;
};

export type Comment = {
  id: number | string;
  content: string;
  createdAt: string;
  score: number;
  hasUpVoted: boolean;
  hasDownVoted: boolean;
  user: User;
  replies: Reply[];
  isNewComment: boolean;
};

export type CommentModal = {
  isOpen: boolean;
  idToDelete: number | string;
};

type State = {
  currentUser: User;
  comments: Comment[];
  commentModal: CommentModal;
};

type VotePayload = {
  commentId: number | string;
};

type AddCommentPayload = {
  commentId: number | string;
  content: string;
};

//NOTE Simulate the API call
const initialState: State = {
  commentModal: {
    isOpen: false,
    idToDelete: "",
  },
  currentUser: {
    image: {
      png: "./images/avatars/image-juliusomo.png",
      webp: "./images/avatars/image-juliusomo.webp",
    },
    username: "juliusomo",
  },
  comments: [
    {
      id: 1,
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      createdAt: "1 month ago",
      score: 12,
      hasUpVoted: false,
      hasDownVoted: false,
      user: {
        image: {
          png: "image-amyrobson.png",
          webp: "./images/avatars/image-amyrobson.webp",
        },
        username: "amyrobson",
      },
      replies: [],
      isNewComment: false,
    },
    {
      id: 2,
      content:
        "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      createdAt: "2 weeks ago",
      score: 5,
      hasUpVoted: false,
      hasDownVoted: false,
      user: {
        image: {
          png: "image-maxblagun.png",
          webp: "./images/avatars/image-maxblagun.webp",
        },
        username: "maxblagun",
      },
      replies: [
        {
          id: 3,
          content:
            "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          createdAt: "1 week ago",
          score: 4,
          hasUpVoted: false,
          hasDownVoted: false,
          replyingTo: "maxblagun",
          user: {
            image: {
              png: "image-ramsesmiron.png",
              webp: "./images/avatars/image-ramsesmiron.webp",
            },
            username: "ramsesmiron",
          },
          replies: [],
          isNewComment: false,
        },
        {
          id: 4,
          content:
            "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
          createdAt: "2 days ago",
          score: 2,
          hasUpVoted: false,
          hasDownVoted: false,
          replyingTo: "ramsesmiron",
          user: {
            image: {
              png: "image-juliusomo.png",
              webp: "./images/avatars/image-juliusomo.webp",
            },
            username: "juliusomo",
          },
          replies: [],
          isNewComment: false,
        },
      ],
      isNewComment: false,
    },
  ],
};

//TODO type the action payload
export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    upVoteComment: (state, action: PayloadAction<VotePayload>) => {
      const { comments } = state;
      const { commentId } = action.payload;

      //Note: Keeping comment below as reference of my old implementation
      // state.comments = handleCommentVoteAction(comments, commentId, true);

      //Note: mutate the comments from state, no need to reassign like state.comments = updateComments
      handleCommentVote(comments, commentId, true);

      return state;
    },
    downVoteComment: (state, action: PayloadAction<VotePayload>) => {
      const { comments } = state;
      const { commentId } = action.payload;

      //Note: mutate the comments from state, no need to reassign like state.comments = updateComments
      handleCommentVote(comments, commentId, false);

      return state;
    },
    prepareNewComment: (state, action) => {
      const { comments, currentUser } = state;
      const { commentId } = action.payload;

      //Note: mutate the comments from state, no need to reassign like state.comments = updateComments
      prepareNewCommentById(comments, commentId, "", currentUser, true);

      return state;
    },
    addComment: (state, action: PayloadAction<AddCommentPayload>) => {
      const { comments } = state;
      const { commentId, content } = action.payload;

      //Note: mutate the comments from state, no need to reassign like state.comments = updateComments
      updateCommentById(comments, commentId, content);

      return state;
    },
    prepareUpdateComment: (state, action) => {
      const { comments } = state;
      const { commentId } = action.payload;

      //Note: mutate the comments from state, no need to reassign like state.comments = updateComments
      prepareCommentForUpdate(comments, commentId);

      return state;
    },
    // deleteComment: (state, action: PayloadAction<VotePayload>) => {
    //   const { comments } = state;
    //   const { commentId } = action.payload;

    //   //delete comment by id
    //   deleteCommentById(comments, commentId);
    //   return state;
    // }, //keeping for reference
    deleteComment: (state) => {
      const {
        comments,
        commentModal: { idToDelete },
      } = state;

      deleteCommentById(comments, idToDelete);
      
      return state;
    },
    showCommentModal: (state, action: PayloadAction<string | number>) => {
      state.commentModal.isOpen = true;
      state.commentModal.idToDelete = action.payload;
      return state;
    },
    hideCommentModal: (state) => {
      state.commentModal.isOpen = false;
      state.commentModal.idToDelete = "";
      return state;
    },
  },
});

export const {
  upVoteComment,
  downVoteComment,
  prepareNewComment,
  addComment,
  prepareUpdateComment,
  deleteComment,
  showCommentModal,
  hideCommentModal,
} = commentSlice.actions;

export const selectCommentReducer = commentSlice.reducer;
