import React, { memo } from "react";
import { NavLink } from "react-router-dom";

function Addposts({
  id,
  posttitle,
  inputPostHandler,
  submitPostHandler,
  // filteredPosts,
  postSubjects,
}) {
  console.log("item");
  return (
    <>
      <div className="post-container">
        <div className="post-content">
          <h1 className="post-title">Добавить пост</h1>
          <div className="post-box">
            <form
              className="form-post"
              onSubmit={(e) => submitPostHandler(e, posttitle)}
            >
              <textarea
                name="posttitle"
                value={posttitle}
                onChange={inputPostHandler}
                placeholder="Оставьте свой пост здесь..."
                rows="4"
              ></textarea>
              <button id="submit-post" type="submit">
                Опубликовать
              </button>
            </form>
          </div>

          <div className="post-info">
            <p>
              Количество постов на данную тему:
              {/* <span id="reply-count">
                {Array.isArray(filteredPosts) ? filteredPosts.length : 0}
              </span> */}
              <span id="reply-count">{postSubjects.length}</span>
            </p>
            {/* Использовать <a /> вместо <NavLink/>. При 
            использовании <a/> производительность лучше */}
            <NavLink to={`/comments/${id}`} className="view-comments">
              Перейти к обсуждению
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

// function areEqual(prevProps, nextProps) {
//   return (
//     prevProps.id === nextProps.id &&
//     prevProps.posttitle === nextProps.posttitle &&
//     prevProps.inputPostHandler === nextProps.inputPostHandler &&
//     prevProps.submitPostHandler === nextProps.submitPostHandler &&
//     prevProps.postSubjects.length === nextProps.postSubjects.length
//   );
// }
function areEqual(prevProps, nextProps) {
  const comparison = {
    idEqual: prevProps.id === nextProps.id,
    posttitleEqual: prevProps.posttitle === nextProps.posttitle,
    inputPostHandlerEqual:
      prevProps.inputPostHandler === nextProps.inputPostHandler,
    submitPostHandlerEqual:
      prevProps.submitPostHandler === nextProps.submitPostHandler,
    postSubjectsEqual: prevProps.postSubjects === nextProps.postSubjects,
  };

  console.log("🔍 areEqual comparison", comparison);

  return (
    comparison.idEqual &&
    comparison.posttitleEqual &&
    comparison.inputPostHandlerEqual &&
    comparison.submitPostHandlerEqual &&
    comparison.postSubjectsEqual
  );
}

export default memo(Addposts, areEqual);
