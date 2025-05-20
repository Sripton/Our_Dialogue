import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
const CommentSection = ({ post, userIDsession,   allComments }) => {

  // useEffect(() => {
  //   fetch(`/api/comments/${post.id}`)
  //     .then((res) => res.json())
  //     .then((data) => setAllComments(data))
  //     .catch((err) => console.log(err));
  // }, [post.id]);

  // Экспортируем наружу setAllComments
  // useImperativeHandle(ref, () => ({
  //   addComments: (newComment) => {
  //     setAllComments((prev) => [...prev, newComment]);
  //   },
  //   setComments: (list) => {
  //     setAllComments(list);
  //   },
  // }));
  console.log("allComments", allComments);
  return (
    <>
      {allComments?.map((comment) => (
        <div className="comment-for-comment" key={comment.id}>
          <p className="comment-text">{comment.commenttitle}</p>
          <div className="comment-actions">
            <button className="like-btn">
              <ion-icon class="thumbs" name="thumbs-up-outline"></ion-icon>{" "}
            </button>
            <button className="like-btn">
              <ion-icon class="thumbs" name="thumbs-down-outline"></ion-icon>{" "}
            </button>
            <button className="reply-btn">reply</button>
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
};

export default CommentSection;
