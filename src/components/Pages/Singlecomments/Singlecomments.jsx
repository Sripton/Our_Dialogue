import React from "react";
import Commentform from "../Commentform";
export default function Singlecomments({
  comment,
  post,
  setShowReplies,
  setAllComments,
  userIDsession,
  replyCommentID,
  setReplyCommentID,
  handleReplyToCommentID,
}) {
  console.log("comment", comment);
  console.log("post", post);
  return (
    <div className="comment-for-comment">
      <p className="comment-text">{comment.commenttitle}</p>
      {replyCommentID === comment.id && (
        <Commentform
          post={post}
          setShowReplies={setShowReplies}
          setAllComments={setAllComments}
          replyCommentID={replyCommentID}
          setReplyCommentID={setReplyCommentID}
        />
      )}
      <div className="comment-actions">
        <button className="like-btn">
          <ion-icon class="thumbs" name="thumbs-up-outline"></ion-icon>
        </button>
        <button className="like-btn">
          <ion-icon class="thumbs" name="thumbs-down-outline"></ion-icon>
        </button>
        <button
          className="reply-btn"
          onClick={() => handleReplyToCommentID(comment.id)}
        >
          reply
        </button>
        {userIDsession === comment.user_id && (
          <>
            <button className="edit-btn">Edit</button>
            <button className="delete-btn">Delete</button>
          </>
        )}
        <small className="comment-note">{`${comment?.User?.name} к ответил ${post?.User?.name}`}</small>
      </div>

      {comment?.Replies && comment?.Replies?.length > 0 && (
        <div className="replies">
          {comment?.Replies?.map((reply) => (
            <Singlecomments
              key={reply.id}
              comment={reply}
              post={post}
              setShowReplies={setShowReplies}
              setAllComments={setAllComments}
              userIDsession={userIDsession}
              replyCommentID={replyCommentID}
              setReplyCommentID={setReplyCommentID}
              handleReplyToCommentID={handleReplyToCommentID}
            />
          ))}
        </div>
      )}
    </div>
  );
}
