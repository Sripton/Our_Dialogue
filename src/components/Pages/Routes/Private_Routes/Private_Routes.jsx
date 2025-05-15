import React from "react";
import { Routes, Route } from "react-router-dom";
import AddpostsWrapper from "../../AddpostsWrapper";
import Postlist from "../../Postlist";
import Subjectlist from "../../Subjectlist";
import Contentlist from "../../Contentlist/Contentlist";

export default function Private_Routes({
  directions,
  thumbnails,
  setPosts,
  posts,
  userIDsession,
  userNameSession,
}) {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Contentlist
              userIDsession={userIDsession}
              directions={directions}
              thumbnails={thumbnails}
            />
          }
        />
        <Route path="/subjects/:id" element={<Subjectlist />} />
        <Route path="/addposts/:id" element={<AddpostsWrapper />} />
        <Route
          path="/comments/:id"
          element={
            <Postlist
              posts={posts}
              setPosts={setPosts}
              userIDsession={userIDsession}
              userNameSession={userNameSession}
            />
          }
        />
      </Routes>
    </>
  );
}
