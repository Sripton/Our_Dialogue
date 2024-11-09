import React from "react";
import { Routes, Route } from "react-router-dom";
import Contentlist from "../../Contentlist/Contentlist";
import Signup from "../../Signup";
import Signin from "../../Signin";

export default function All_Routes({
  userIDsession,
  directions,
  thumbnails,
  setUserNameSession,
  setUserIDSession,
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
        <Route
          path="/signup"
          element={
            <Signup
              setUserNameSession={setUserNameSession}
              setUserIDSession={setUserIDSession}
            />
          }
        />
        <Route
          path="/signin"
          element={
            <Signin
              setUserNameSession={setUserNameSession}
              setUserIDSession={setUserIDSession}
            />
          }
        />
      </Routes>
    </>
  );
}
