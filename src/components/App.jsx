import React, { useEffect, useState } from "react";
import Navbar from "./Pages/Navbar";
import { Route, Routes } from "react-router-dom";
export default function App() {
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  const isMobile = {
    Android: () => {
      return navigator.userAgent.match(/Android/gi);
    },
    Blackberry: () => {
      return navigator.userAgent.match(/Blackberry/gi);
    },
    IOS: () => {
      return navigator.userAgent.match(/iPhone|iPad|iPod/gi);
    },
    Opera: () => {
      return navigator.userAgent.match(/Opera Mini/gi);
    },
    Windows: () => {
      return navigator.userAgent.match(/IEMobile/gi);
    },
    any: () => {
      return (
        isMobile.Android() ||
        isMobile.Blackberry() ||
        isMobile.IOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };
  useEffect(() => {
    const mobileDevice = isMobile.any();
    setIsMobileDevice(mobileDevice);
    if (mobileDevice) {
      document.body.classList.add("_touch");
      document.body.classList.remove("_pc");
    } else {
      document.body.classList.add("_pc");
      document.body.classList.remove("_touch");
    }
    return () => {
      document.body.classList.remove("_touch");
      document.body.classList.remove("_pc");
    };
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />} />
      </Routes>
    </>
  );
}
