import React, { useState } from "react";
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

  console.log("comment", comment);
  // Состояние для отслеживания по ID какой комменатрий изменяется
  const [editCommentID, setEditCommentID] = useState(null);
  // Состояние для изменения  комменатрия
  const [editCommentsText, setEditCommentsText] = useState({
    commenttitle: "",
  });

  const editCommentsHandler = (comment) => {
    setEditCommentID(comment.id);
    setEditCommentsText({ commenttitle: comment.commenttitle });
  };

  const editCommentsInputsHandler = (e) => {
    setEditCommentsText((prevComments) => ({
      ...prevComments,
      [e.target.name]: e.target.value,
    }));
  };

  // Функция  для глубокой обработки рекурсивно измененных комментариев в дереве
  const updateCommentInTree = (comments, updatedComment) => {
    return comments.map((comment) => {
      if (comment.id === updatedComment.id) {
        return { ...comment, commenttitle: updatedComment.commenttitle };
      }
      if (comment?.Replies && comment?.Replies?.length > 0) {
        return {
          ...comment,
          Replies: updateCommentInTree(comment.Replies, updatedComment),
        };
      }
      return comment;
    });
  };
  const editCommentsSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/comments/${comment.id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ commenttitle: editCommentsText.commenttitle }),
      });
      if (response.ok) {
        const data = await response.json();
        setAllComments((prevComments) => {
          return updateCommentInTree(prevComments, data);
        });
        setEditCommentID(null);
      }
    } catch (error) {
      console.log(error);
    }
  };


  console.log('userIDsession', userIDsession);
  return (
    <div className="comment-for-comment">
      <p className={`comment-text  ${editCommentID ? "editHidden" : ""}`}>
        {comment.commenttitle}
      </p>
      {replyCommentID === comment.id && (
        <Commentform
          post={post}
          setShowReplies={setShowReplies}
          setAllComments={setAllComments}
          replyCommentID={replyCommentID}
          setReplyCommentID={setReplyCommentID}
        />
      )}

      {editCommentID === comment.id && (
        <form onSubmit={editCommentsSubmitHandler}>
          <div id="reply-form-template" className="add-comment">
            <textarea
              name="commenttitle"
              value={editCommentsText.commenttitle}
              onChange={editCommentsInputsHandler}
              placeholder="Write a reply..."
            />
            <button type="submit">Post Comment</button>
          </div>
        </form>
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
            <button
              className="edit-btn"
              onClick={() => editCommentsHandler(comment)}
            >
              Edit
            </button>
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
