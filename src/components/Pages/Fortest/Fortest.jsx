import React, { useEffect } from "react";

export default function Subjectlist() {
  useEffect(() => {
    const tabNavList = document.querySelector(".tab-nav-list"),
      leftBtn = document.querySelector(".left-btn"),
      rightBtn = document.querySelector(".right-btn");

    const handleLeftClick = () => {
      tabNavList.scrollLeft -= 150;
    };
    const handleRightclick = () => {
      tabNavList.scrollLeft += 150;
    };
    leftBtn.addEventListener("click", handleLeftClick);
    rightBtn.addEventListener("click", handleRightclick);

    return () => {
      leftBtn.removeEventListener("click", handleLeftClick);
      rightBtn.removeEventListener("click", handleRightclick);
    };
  }, []);

  return (
    <>
      <div className="main-container">
        <div className="tab-nav-bar">
          <div className="tab-navigation">
            <i className="uil uil-angle-left left-btn"></i>

            <i className="uil uil-angle-right right-btn"></i>

            <ul className="tab-nav-list">
              <li className="tab-nav-item">History russia</li>
              <li className="tab-nav-item">History kavkaz</li>
              <li className="tab-nav-item">History west</li>
              <li className="tab-nav-item">History azia</li>
              <li className="tab-nav-item">History persia</li>
              <li className="tab-nav-item">History egypt</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
