import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import Navbar from "./Pages/Navbar";
import All_Routes from "./Pages/Routes/All_Routes";
import Private_Routes from "./Pages/Routes/Private_Routes/Private_Routes";

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
      {!userIDsession ? (
        <All_Routes
          userIDsession={userIDsession}
          directions={directions}
          thumbnails={thumbnails}
          setUserNameSession={setUserNameSession}
          setUserIDSession={setUserIDSession}
        />
      ) : (
        <Private_Routes
          directions={directions}
          thumbnails={thumbnails}
          setPosts={setPosts}
          posts={posts}
          userIDsession={userIDsession}
          userNameSession={userNameSession}
        />
      )}
    </>
  );
}
