import React, { useState, useEffect, memo, useRef } from "react";
import CommentSection from "../CommentSection/CommentSection";
import Commentform from "../Commentform";
function Postcard({ post, userIDsession, deletePostHandler, userNameSession }) {
  const [isDotsActive, setIsDotsActive] = useState(false);
  const handleDots = () => {
    setIsDotsActive(!isDotsActive);
  };

  // Для отображения формы ответов на посты и комментарии
  const [isShowReplies, setShowReplies] = useState(false);
  const handleShowReplies = () => {
    setShowReplies(!isShowReplies);
  };

  const [isEditPostActive, setIsEditPostActive] = useState(false);
  const [editPostText, setEditPostText] = useState({
    posttitle: "",
  });
  const handleEditActive = () => {
    setIsEditPostActive(!isEditPostActive);
    setEditPostText(post.posttitle);
  };
  const handleEditPostText = (e) => {
    setEditPostText(e.target.value);
  };
  const [likePosts, setLikePosts] = useState([]);
  const [dislikePosts, setDislikePosts] = useState([]);

  const [allComments, setAllComments] = useState([]);

  const [showComments, setShowComments] = useState(false);
  const handleShowComments = () => setShowComments(!showComments);

  // Для добавления комментариев
  // const commentRef = useRef();
  // const handleAddComment = (newComment) => {
  //   // Добавь проверку безопасности внутри handleAddComment,
  //   // чтобы избежать ошибок, если commentRef.current ещё null:
  //   if (commentRef.current?.addComments) {
  //     commentRef.current.addComments(newComment);
  //   }
  // };

  const submitEditPostHandler = async (e) => {
    e.preventDefault();
    const responce = await fetch(`/api/posts/${post.id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ posttitle: editPostText }),
    });
    if (responce.ok) {
      setIsEditPostActive(false);
      post.posttitle = editPostText;
    }
  };

  const submitReactionPost = async (post_id, reaction_type) => {
    // проверяем есть ли реакция от пользователя на пост
    const isLike = likePosts.some((like) => like.user_id === userIDsession);
    const isDislike = dislikePosts.some(
      (dislike) => dislike.user_id === userIDsession
    );
    try {
      // если тип реакции like и пользователь уже ставил like
      if (reaction_type === "like" && isLike) {
        // удаляем like локально
        setLikePosts((prevLikes) =>
          prevLikes.filter((like) => like.user_id !== userIDsession)
        );
        // Отправляем DELETE-запрос на сервер для удаления лайка
        await fetch(
          // DELETE-запрос с body НЕ поддерживается во всех браузерах!
          // Решение 1 (надёжный способ) — передавать user_id в query-параметрах или в params
          `/api/likeordislikepost/${post_id}?user_id=${userIDsession}`,
          {
            method: "DELETE",
            // Некоторые реализации fetch просто игнорируют тело у DELETE, и на бэке оно будет undefined
            // headers: { "Content-type": "application/json" },
            // body: JSON.stringify({ user_id: userIDsession }),
          }
        );
      } else if (reaction_type === "dislike" && isDislike) {
        // удаляем dislike локально
        setDislikePosts((prevDislike) =>
          prevDislike.filter((dislike) => dislike.user_id !== userIDsession)
        );
        await fetch(
          // DELETE-запрос с body НЕ поддерживается во всех браузерах!
          // Решение 1 (надёжный способ) — передавать user_id в query-параметрах или в params
          `/api/likeordislikepost/${post_id}?user_id=${userIDsession}`,
          {
            method: "DELETE",
            // Некоторые реализации fetch просто игнорируют тело у DELETE, и на бэке оно будет undefined
            // headers: { "Content-type": "application/json" },
            // body: JSON.stringify({ user_id: userIDsession }),
          }
        );
      } else {
        // Если реакции нет, добавляем её
        const response = await fetch(`/api/likeordislikepost/${post_id}`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            reaction_type: reaction_type,
            user_id: userIDsession,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          if (reaction_type === "like") {
            setLikePosts((prevLike) => [...prevLike, data]);
            setDislikePosts((prevDislike) =>
              prevDislike.filter((dislike) => dislike.user_id !== userIDsession)
            );
          } else if (reaction_type === "dislike") {
            setDislikePosts((prevDislike) => [...prevDislike, data]);
            setLikePosts((prevLike) =>
              prevLike.filter((like) => like.user_id !== userIDsession)
            );
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetch(`/api/comments/${post.id}`)
      .then((res) => res.json())
      .then((data) => setAllComments(data))
      .catch((err) => console.log(err));
  }, [post.id]);

  useEffect(() => {
    fetch(`/api/likeordislikepost/getLikes/${post.id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setLikePosts(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(`/api/likeordislikepost/getDislikes/${post.id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setDislikePosts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className={`comment-section ${isDotsActive ? "show-actions" : ""}`}>
        <div className="comment-list">
          <div className="comment">
            {isEditPostActive ? (
              <form onSubmit={submitEditPostHandler}>
                <textarea
                  name="posttitle"
                  value={editPostText}
                  onChange={handleEditPostText}
                  placeholder="Edit your post..."
                />
                <button className="edit-post-btn" type="submit">
                  Измененить
                </button>
              </form>
            ) : (
              <p className="comment-text">{`${post.posttitle}`}</p>
            )}

            <div className="comment-actions">
              <button
                className="like-btn"
                onClick={() => submitReactionPost(post.id, "like")}
              >
                <ion-icon class="thumbs" name="thumbs-up-outline"></ion-icon>{" "}
                {likePosts.length}
              </button>
              <button
                className="dislike-btn"
                onClick={() => submitReactionPost(post.id, "dislike")}
              >
                <ion-icon class="thumbs" name="thumbs-down-outline"></ion-icon>{" "}
                {dislikePosts.length}
              </button>
              <button className="reply-btn" onClick={handleShowReplies}>
                reply
              </button>
              {/* Логика для отображения кнопок edit и delete если пользоваель зарегистрирован */}
              {userIDsession !== post.user_id ? (
                ""
              ) : (
                <>
                  <button className="edit-btn" onClick={handleEditActive}>
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deletePostHandler(post.id)}
                  >
                    Delete
                  </button>
                </>
              )}
              {/* Логика для отображения кнопок edit и delete если пользоваель зарегистрирован */}

              <small className="comment-note">
                {post?.User?.name}, {"к теме"} ({post?.Subject?.subjectName})
              </small>
            </div>
            <div className="dots" onClick={handleDots}>
              &#x2022;&#x2022;&#x2022;
            </div>
            <div className="close-btn hidden" onClick={handleDots}>
              &#10006;
            </div>
            <div className="replies">
              {/* Логика для отображения формы для создания комментария */}

              {isShowReplies && (
                <Commentform
                  post={post}
                  setShowReplies={setShowReplies}
                  setAllComments={setAllComments}
                />
              )}

              <button
                className="toggle-comments-btn"
                onClick={handleShowComments}
              >
                Комментарии
              </button>
              {showComments && (
                <CommentSection
                  allComments={allComments}
                  userIDsession={userIDsession}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
function areEqual(prevProps, nextProps) {
  return (
    prevProps.post.id === nextProps.post.id &&
    prevProps.post === nextProps.post &&
    prevProps.userIDsession === nextProps.userIDsession &&
    prevProps.userNameSession === nextProps.userNameSession &&
    prevProps.deletePostHandler === nextProps.deletePostHandler
  );
}
export default memo(Postcard, areEqual);
