import { nanoid } from "@reduxjs/toolkit";
import { Comment, Reply, User } from "./comment.reducer";


/**
 * Handles the creation of a new comment or reply.
 * 
 * @param comment - The comment or reply being replied to.
 * @param content - The content of the comment or reply.
 * @param currentUser - The user creating the comment or reply.
 * @param isPreparingNewComment - Indicates whether a new comment is being prepared.
 * @returns The created reply.
 */
export const handleCommentReply = (
  comment: Comment | Reply,
  content: string,
  currentUser: User,
  isPreparingNewComment: boolean
): Reply => {
  const { id } = comment;
  return {
    id: isPreparingNewComment ? nanoid() : id, //we use random  ID generator from toolkit
    content: content,
    createdAt: "This should be coming from the server",
    score: 0,
    hasUpVoted: false,
    hasDownVoted: false,
    replyingTo: "todo get what user is replying to",
    user: currentUser,
    replies: [],
    isNewComment: content.trim().length === 0, //if the content is empty then it's a new comment
  };
};

/**
 * Helps with preparing new comment by  pushing the initial details to the parent comment / reply.
 * Helps with updating the Prepared Comment when the user submit reply
 * This is for reply on rep
 *
 * @param targetCommentId - the id of the comment that is being replied to
 * @param content - the content of the reply text area
 * @param  isPreparingNewComment - boolean to check if the user is preparing a new comment or updating an existing one
 * @param currentUser - the current user
 * @return reply[] - the updated replies array
 */
export const handleCommentReplyUpdate = (
  targetCommentId: string | number,
  comment: Comment,
  isPreparingNewComment: boolean,
  content: string,
  currentUser: User
): Reply[] => {
  //handle scenario where replies is empty on target comment
  if (comment.replies.length === 0) {
    comment.replies.push(
      handleCommentReply(comment, content, currentUser, isPreparingNewComment)
    );
    return comment.replies;
  }

  return comment.replies.map((reply) => {
    if (isPreparingNewComment) {
      // When replying for the first time, add a new reply to each existing reply
      reply.replies.push(
        handleCommentReply(reply, content, currentUser, isPreparingNewComment)
      );
    } else {
      //update the existing reply
      const targetCommentIdIndex = comment.replies.findIndex(
        (reply) => reply.id === targetCommentId
      );
      if (targetCommentIdIndex !== -1) {
        comment.replies[targetCommentIdIndex].content = content;
        comment.replies[targetCommentIdIndex].isNewComment = false;
      }
    }

    return reply;
  });
};
