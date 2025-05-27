import React from "react";
import Commentform from "../Commentform";

export default function Singlecomments({
  comment,
  commentMap,
  post,
  setShowReplies,
  setAllComments,
  userIDsession,
  replyCommentID,
  setReplyCommentID,
  handleReplyToCommentID,
}) {

// Забираем автора комменатрия к посту непосредственно из comment
  const author = comment?.User?.name;
  // Забираем родителя комменатрия к которму был напиан комментарий
  const parentAuthor =
    comment.parent_id && commentMap[comment.parent_id]?.User?.name;
  console.log("parentAuthor", parentAuthor);

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
        {/* {comment.parent_id === null ? (
          <small className="comment-note">{`${comment?.User?.name}  ответил ${post?.User?.name}`}</small>
        ) : (
          comment.Replies.map((reply) => (
            <div key={reply.id}>
              <small className="comment-note">{`${comment?.User?.name} ответил ${reply?.User?.name}`}</small>
            </div>
          )) 
        )} */}

        {comment.parent_id === null ? (
          <small className="comment-note">{`${author}  ответил ${post?.User?.name}`}</small>
        ) : (
          <small className="comment-note">{`${author}  ответил ${parentAuthor}`}</small>
        )}
      </div>

      {comment?.Replies && comment?.Replies?.length > 0 && (
        <div className="replies">
          {comment?.Replies?.map((reply) => (
            <Singlecomments
              key={reply.id}
              comment={reply}
              commentMap={commentMap}
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
