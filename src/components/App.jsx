import React, { useEffect, useState } from "react";
import Navbar from "./Pages/Navbar";
import { Route, Routes } from "react-router-dom";
import Contentlist from "./Pages/Contentlist/Contentlist";

export default function App({ directions, thumbnails }) {
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [isArrowActive, setIsArrowActive] = useState(false);
  const [iconMenuActive, setIconMenuActive] = useState(false);

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

  return (
    <>
      <Navbar
        isArrowActive={isArrowActive}
        handleArrowActive={handleArrowActive}
        iconMenuActive={iconMenuActive}
        handleIconMenuActive={handleIconMenuActive}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Contentlist directions={directions} thumbnails={thumbnails} />
          }
        />
      </Routes>
    </>
  );
}
