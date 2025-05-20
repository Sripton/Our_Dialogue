import React from "react";
import { FixedSizeList as List } from "react-window";
const CommentSection = ({ userIDsession, allComments }) => {
  const Row = ({ index, style }) => {
    const comment = allComments[index];
    console.log("comments", comment);
    return (
      <>
        <div style={style} className="comment-for-comment" key={comment.id}>
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
      </>
    );
  };

  return (
    <List
      height={400} // Высота контейнера (px)
      itemCount={allComments.length}
      itemSize={70} // Высота одного элемента (px)
      width={"100%"} // или конкретное значение
    >
      {Row}
    </List>
  );
};

export default CommentSection;
