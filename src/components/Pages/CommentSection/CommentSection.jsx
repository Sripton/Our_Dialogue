import React, { useEffect, useState } from "react";
import Commentform from "../Commentform";
export default function CommentSection({ post, userIDsession }) {
  const [allComments, setAllComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  const onAddComment = (newComment) => {
    setAllComments((prev) => [...prev, newComment]);
  };

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  useEffect(() => {
    fetch(`/api/comments/${post.id}`)
      .then((res) => res.json())
      .then((dat) => setAllComments(dat))
      .catch((err) => console.log(err));
  }, [post.id]);
  return (
    <>
      {" "}
      <button className="toggle-comments-btn" onClick={handleShowComments}>
        {`${showComments ? "Скрыть" : "Комментарии"} ${allComments?.length}`}
      </button>
      {allComments?.map((comment) => (
        <div
          className={`comment-for-comment ${showComments ? "" : "hidden"}`}
          key={comment.id}
        >
          <p className="comment-text">{comment.commenttitle}</p>
          <div className="comment-actions">
            <button className="like-btn">
              <ion-icon class="thumbs" name="thumbs-up-outline"></ion-icon>{" "}
            </button>
            <button className="like-btn">
              <ion-icon class="thumbs" name="thumbs-down-outline"></ion-icon>{" "}
            </button>
            <button className="reply-btn">reply</button>
            {/* Если пользователь является воадльцем комментария, то отображаем кнопки edit, delete*/}
            {userIDsession === comment.user_id ? (
              <>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      ))}
    </>
  );
}
