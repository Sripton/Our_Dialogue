import React, { useEffect, useState } from "react";

export default function Subjectlist() {
  const [leftBtnActive, setLeftBtnActive] = useState(false);
  const [rightBtnActive, setRightBtnActive] = useState(false);

  useEffect(() => {
    setLeftBtnActive(!leftBtnActive);
    setRightBtnActive(!rightBtnActive);
  },[]);
  const handleLeftBtnActive = () => {
    const tabNavList = document.querySelector(".tab-nav-list");
    if (leftBtnActive) {
      tabNavList.scrollLeft -= 150;
    } 
  };
  const handleRightBtnActive = () => {
    const tabNavList = document.querySelector(".tab-nav-list");
    if (rightBtnActive) {
      tabNavList.scrollLeft += 150;
    } 
  };
  return (
    <>
      <div className="main-container">
        <div className="tab-nav-bar">
          <div className="tab-navigation">
            <i
              className="uil uil-angle-left left-btn"
              onClick={handleLeftBtnActive}
            ></i>

            <i
              className="uil uil-angle-right right-btn"
              onClick={handleRightBtnActive}
            ></i>

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

        <div className="tab-content">
          <div className="tab">
            <div className="row">
              <div className="left-column">
                <div className="img-card">
                  <img src="#" />
                </div>
              </div>
              <div className="right-column">right-column</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
