import React, { useEffect, useState } from "react";
import Navbar from "./Pages/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import Contentlist from "./Pages/Contentlist/Contentlist";
import Subjectlist from "./Pages/Subjectlist";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import Addposts from "./Pages/Addposts";
import Postlist from "./Pages/Postlist";

export default function App({
  directions,
  thumbnails,
  userID,
  userName,
  allPosts,
}) {
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [isArrowActive, setIsArrowActive] = useState(false);
  const [iconMenuActive, setIconMenuActive] = useState(false);
  const [userNameSession, setUserNameSession] = useState(userName || null);
  const [userIDsession, setUserIDSession] = useState(userID || null);
  const [posts, setPosts] = useState(allPosts || null);

  const navigate = useNavigate();
  const isMobile = () => {
    const userAgent = navigator.userAgent;
    return /Android|Blackberry|iPhone|iPad|iPod|Opera Mini|IEMobile/gi.test(
      userAgent
    );
  };

  useEffect(() => {
    const mobileDevice = isMobile();
    setIsMobileDevice(mobileDevice);
    document.body.classList.toggle("_touch", mobileDevice);
    document.body.classList.toggle("_pc", !mobileDevice);
  }, []);

  const handleArrowActive = () => {
    setIsArrowActive(!isArrowActive);
  };
  const handleIconMenuActive = () => {
    setIconMenuActive(!iconMenuActive);
  };

  const logoutHandler = async () => {
    const responce = await fetch("/api/users/logout");
    if (responce.ok) {
      setUserNameSession(null);
      setUserIDSession(null);
      navigate("/");
    }
  };
  console.log('userID', userID);
  console.log('userIDsession', userIDsession);

  return (
    <>
      <Navbar
        isArrowActive={isArrowActive}
        handleArrowActive={handleArrowActive}
        iconMenuActive={iconMenuActive}
        handleIconMenuActive={handleIconMenuActive}
        userNameSession={userNameSession}
        userIDsession={userIDsession}
        logoutHandler={logoutHandler}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Contentlist directions={directions} thumbnails={thumbnails} />
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
        <Route path="/subjects/:id" element={<Subjectlist />} />
        <Route
          path="/addposts/:id"
          element={<Addposts setPosts={setPosts} />}
        />
        <Route
          path="/comments/:id"
          element={
            <Postlist
              posts={posts}
              setPosts={setPosts}
              userIDsession={userIDsession}
            />
          }
        />
      </Routes>
    </>
  );
}
