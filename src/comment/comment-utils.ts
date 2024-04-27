import { nanoid } from "@reduxjs/toolkit";
import { Comment, Reply, User } from "./comment.reducer";

/**
 * Handles the voting functionality for a comment.
 * @param comments - The array of comments.
 * @param targetCommentId - The ID of the target comment.
 * @param isUpVoted - A boolean indicating whether the comment is being upvoted or downvoted.
 * @returns A boolean indicating whether the vote was successfully handled.
 */
export const handleCommentVote = (
  comments: Comment[],
  targetCommentId: number | string,
  isUpVoted: boolean
) => {
  for (const comment of comments) {
    if (comment.id === targetCommentId) {
      comment.hasUpVoted = isUpVoted;
      comment.hasDownVoted = !isUpVoted;
      comment.score = isUpVoted ? comment.score + 1 : comment.score - 1;
      return true;
    }

    if (
      comment.replies &&
      handleCommentVote(comment.replies, targetCommentId, isUpVoted) // Fix: Pass comment.replies instead of comments
    ) {
      return true;
    }
  }

  return false;
};

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
 * Prepares a new comment by adding it to the comments array or its replies.
 * @param comments - The array of comments or replies.
 * @param targetCommentId - The ID of the target comment.
 * @param content - The content of the new comment.
 * @param currentUser - The current user.
 * @param isPreparingNewComment - A boolean indicating if a new comment is being prepared.
 * @returns A boolean indicating if the new comment was successfully added.
 */

export const prepareNewCommentById = (
  comments: (Comment | Reply)[],
  targetCommentId: string | number,
  content: string,
  currentUser: User,
  isPreparingNewComment: boolean
) => {
  for (const comment of comments) {
    if (comment.id === targetCommentId) {
      comment.replies.push(
        handleCommentReply(comment, content, currentUser, isPreparingNewComment)
      );
      return true;
    }

    if (
      comment.replies &&
      prepareNewCommentById(
        comment.replies,
        targetCommentId,
        content,
        currentUser,
        isPreparingNewComment
      )
    ) {
      return true;
    }
  }

  return false;
};

/**
 * Updates a comment by its ID in the comments array.
 * If the comment is found, its content is updated and the isNewComment flag is set to false.
 * If the comment is not found, the function returns false.
 *
 * @param comments - The array of comments to search through.
 * @param targetCommentId - The ID of the comment to update.
 * @param content - The new content for the comment.
 * @returns True if the comment was found and updated, false otherwise.
 */
export const updateCommentById = (
  comments: (Comment | Reply)[],
  targetCommentId: string | number,
  content: string
): boolean => {
  for (const comment of comments) {
    if (comment.id === targetCommentId) {
      comment.content = content;
      comment.isNewComment = false;
      return true;
    }

    if (
      comment.replies &&
      updateCommentById(comment.replies, targetCommentId, content)
    ) {
      return true;
    }
  }

  return false;
};

/**
 * Deletes a comment by its ID from an array of comments and replies.
 * If a comment has replies, it recursively deletes them as well.
 *
 * @param comments - The array of comments and replies.
 * @param targetCommentId - The ID of the comment to delete.
 * @returns The updated array of comments and replies after deletion.
 */
export const deleteCommentById = (
  comments: (Comment | Reply)[],
  targetCommentId: string | number
): (Comment | Reply)[] => {
  // Filter out the comment with the target ID
  const filteredComments = comments.filter(
    (comment) => comment.id !== targetCommentId
  );

  // For each remaining comment, if it has replies, recursively filter them as well
  filteredComments.forEach((comment) => {
    if (comment.replies) {
      comment.replies = deleteCommentById(
        comment.replies,
        targetCommentId
      ) as Reply[];
    }
  });

  return filteredComments;
};

export const prepareCommentForUpdate = (
  comments: (Comment | Reply)[],
  targetCommentId: string | number
): boolean => {
  for (const comment of comments) {
    if (comment.id === targetCommentId) {
      comment.isNewComment = true;
      return true;
    }

    if (
      comment.replies &&
      prepareCommentForUpdate(comment.replies, targetCommentId)
    ) {
      return true;
    }
  }

  return false;
};
