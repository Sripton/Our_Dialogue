import React, { useEffect, useState } from "react";
import Navbar from "./Pages/Navbar";
import { Route, Routes } from "react-router-dom";
export default function App() {
  const [isMobileDevice, setIsMobileDevice] = useState(false);
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
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />} />
      </Routes>
    </>
  );
}
