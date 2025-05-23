import React, { useState } from "react";

export default function Commentform({
  post,
  setShowReplies,
  setAllComments,
  replyCommentID,
  setReplyCommentID,
}) {
  const [inputsComment, setInputsComment] = useState({
    commenttitle: "",
  });
  const inputsCommentHandler = (e) => {
    setInputsComment((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitCommentsHandler = async (e) => {
    e.preventDefault();
    if (!inputsComment.commenttitle.trim()) {
      setInputsComment({ commenttitle: "" });
      setReplyCommentID(null);
      return; // Завершаем функцию, не отправляя запроc
    }
    const parentId = replyCommentID || null;
    try {
      const response = await fetch(`/api/comments/${post.id}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          commenttitle: inputsComment.commenttitle,
          parent_id: parentId,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        // Создаем локальный объект комментария (связанный с тем, на который отвечают)
        const formattedComment = {
          ...data,
          parentId,
        };

        if (parentId) {
          setAllComments((prevComments) =>
            prevComments.map((comment) =>
              comment.id === replyCommentID
                ? {
                    ...comment,
                    RepliesComment: [
                      ...(comment.RepliesComment || []),
                      formattedComment,
                    ],
                  }
                : comment
            )
          );
          setReplyCommentID(null);
        } else {
          setAllComments((prevComments) => [...prevComments, formattedComment]);
          setShowReplies(false);
        }
      }
    } catch (error) {
      console.log("Ошибка при создании комментария", error);
    }
  };

  return (
    <form onSubmit={submitCommentsHandler}>
      <div id="reply-form-template" className="add-comment">
        <textarea
          name="commenttitle"
          placeholder="Write a reply..."
          value={inputsComment.commenttitle}
          onChange={inputsCommentHandler}
        ></textarea>
        <button type="submit">Post Comment</button>
      </div>
    </form>
  );
}
