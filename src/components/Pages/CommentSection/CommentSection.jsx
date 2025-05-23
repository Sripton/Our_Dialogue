import React from "react";
import Singlecomments from "../Singlecomments/Singlecomments";

const CommentSection = ({
  post,
  setShowReplies,
  setAllComments,
  userIDsession,
  allComments,
  replyCommentID,
  setReplyCommentID,
  handleReplyToCommentID,
}) => {
  return (
    // <>
    //   {allComments?.map((comment) => (
    //     <div className="comment-for-comment" key={comment.id}>
    //       <p className="comment-text">{comment.commenttitle}</p>
    //       {/* Вызов формы для добавления комментария к комментарию */}
    //       {replyCommentID === comment.id ? (
    //         <div className="replies">
    //           <Commentform
    //             post={post}
    //             setShowReplies={setShowReplies}
    //             setAllComments={setAllComments}
    //             replyCommentID={replyCommentID}
    //             setReplyCommentID={setReplyCommentID}
    //           />{" "}
    //         </div>
    //       ) : (
    //         ""
    //       )}
    //       {/* Кнопки под каждым комментарием */}
    //       <div className="comment-actions">
    //         <button className="like-btn">
    //           <ion-icon class="thumbs" name="thumbs-up-outline"></ion-icon>{" "}
    //         </button>
    //         <button className="like-btn">
    //           <ion-icon class="thumbs" name="thumbs-down-outline"></ion-icon>{" "}
    //         </button>
    //         <button
    //           className="reply-btn"
    //           onClick={() => handleReplyToCommentID(comment.id)}
    //         >
    //           reply
    //         </button>
    //         {/* Отображение комментариев кнопок если пользователь яв-ся автором
    //         комментария */}
    //         {userIDsession === comment.user_id ? (
    //           <>
    //             <button className="edit-btn">Edit</button>
    //             <button className="delete-btn">Delete</button>
    //           </>
    //         ) : (
    //           ""
    //         )}
    //       </div>
    //     </div>
    //   ))}
    // </>
    <>
      {allComments?.map((comment) => (
        <Singlecomments
          key={comment.id}
          comment={comment}
          post={post}
          setShowReplies={setShowReplies}
          setAllComments={setAllComments}
          userIDsession={userIDsession}
          replyCommentID={replyCommentID}
          setReplyCommentID={setReplyCommentID}
          handleReplyToCommentID={handleReplyToCommentID}
        />
      ))}
    </>
  );
};

export default CommentSection;
