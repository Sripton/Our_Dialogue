import React, { useEffect, useRef } from "react";

export default function Subjectlist() {
  // useEffect(() => {
  //   const tabNavList = document.querySelector(".tab-nav-list"),
  //     leftBtn = document.querySelector(".left-btn"),
  //     rightBtn = document.querySelector(".right-btn");
  //   function iconVisibilit() {
  //     const scrollLeft = Math.ceil(tabNavList.scrollLeft);
  //     const scrollWidth = tabNavList.scrollWidth - tabNavList.clientWidth;
  //     leftBtn.style.display = scrollLeft > 0 ? "block" : "none";
  //     rightBtn.style.display = scrollWidth > scrollLeft ? "block" : "none";
  //   }
  //   const handleLeftClick = () => {
  //     tabNavList.scrollLeft -= 150;
  //     setTimeout(() => iconVisibilit(), 50);
  //     // iconVisibilit()
  //   };
  //   const handleRightclick = () => {
  //     tabNavList.scrollLeft += 150;
  //      setTimeout(() => iconVisibilit(), 50);
  //     // iconVisibilit()
  //   };
  //   leftBtn.addEventListener("click", handleLeftClick);
  //   rightBtn.addEventListener("click", handleRightclick);

  //   return () => {
  //     leftBtn.removeEventListener("click", handleLeftClick);
  //     rightBtn.removeEventListener("click", handleRightclick);
  //   };
  // }, []);

  const tabNavListRef = useRef(null);
  const leftBtnRef = useRef(null);
  const rightBtnRef = useRef(null);

  useEffect(() => {
    const tabNavList = tabNavListRef.current;
    const leftBtn = leftBtnRef.current;
    const rightBtn = rightBtnRef.current;

    function iconVisibilit() {
      const scrollLeft = Math.ceil(tabNavList.scrollLeft);
      const scrollWidth = tabNavList.scrollWidth - tabNavList.clientWidth;
      leftBtn.style.display = scrollLeft > 0 ? "block" : "none";
      rightBtn.style.display = scrollWidth > scrollLeft ? "block" : "none";
    }

    const handleLeftClick = () => {
      tabNavList.scrollLeft -= 150;
      setTimeout(() => iconVisibilit(), 50);
      // iconVisibilit()
    };
    const handleRightclick = () => {
      tabNavList.scrollLeft += 150;
      setTimeout(() => iconVisibilit(), 50);
      // iconVisibilit()
    };
    leftBtn.addEventListener("click", handleLeftClick);
    rightBtn.addEventListener("click", handleRightclick);

    return () => {
      leftBtn.removeEventListener("click", handleLeftClick);
      rightBtn.removeEventListener("click", handleRightclick);
      tabNavList.addEventListener("scroll", iconVisibilit);
    };
  }, []);

  return (
    <>
      <div className="main-container">
        <div className="tab-nav-bar">
          <div className="tab-navigation">
            <i className="uil uil-angle-left left-btn" ref={leftBtnRef}></i>

            <i className="uil uil-angle-right right-btn" ref={rightBtnRef}></i>

            <ul className="tab-nav-list" ref={tabNavListRef}>
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
