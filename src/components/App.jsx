import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [userNameSession, setUserNameSession] = useState(userName || null);
  const [userIDsession, setUserIDSession] = useState(userID || null);
  const [posts, setPosts] = useState(allPosts || null);

  const navigate = useNavigate();

  // Функция isMobile  используется для определения того, осуществляется ли доступ к приложению с мобильного устройства.
  useEffect(() => {
    const isMobile = () => {
      // Функция всегда true
      const userAgent = navigator.userAgent;
      return /Android|Blackberry|iPhone|iPad|iPod|Opera Mini|IEMobile/gi.test(
        userAgent
      );
    };
    const mobileDevice = isMobile();
    document.body.classList.toggle("_touch", mobileDevice);
    document.body.classList.toggle("_pc", !mobileDevice);
    // Очистка эффекта при размонтировании
    return () => {
      document.body.classList.remove("_touch", "_pc");
    };
  }, []);

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
