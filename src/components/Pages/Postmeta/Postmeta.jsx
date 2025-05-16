import React, { memo } from "react";
import { NavLink } from "react-router-dom";

function Postmeta({ id, postSubjects }) {
  console.log("item render in post meta");
  return (
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
  );
}

export default memo(Postmeta);
