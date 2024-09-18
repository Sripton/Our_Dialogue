import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function Fortest() {
  
    const [subjects, setSubjects] = useState([]);
    const { id } = useParams();
    useEffect(() => {
      fetch(`/api/subjects/${id}`, { method: "GET" })
        .then((res) => res.json())
        .then((data) => setSubjects(data))
        .catch((err) => console.log(err));
    }, []);
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
  
      window.onresize = () => {
        rightBtn.style.display =
          tabNavList.scrollWidth > tabNavList.clientWidth ||
          tabNavList.scrollWidth >= window.innerWidth
            ? "block"
            : "none";
        leftBtn.style.display =
          tabNavList.scrollWidth >= window.innerWidth ? "" : "none";
        const scrollLeftValue = Math.round(tabNavList.scrollLeft);
        leftBtn.style.display = scrollLeftValue > 0 ? "block" : "none";
      };
      let activeDragg = false;
      tabNavList.addEventListener("mousemove", (drag) => {
        if (!activeDragg) {
          return;
        }
        tabNavList.scrollLeft -= drag.movementX;
      });
  
      tabNavList.addEventListener("mousedown", () => {
        activeDragg = true;
      });
  
      return () => {
        leftBtn.removeEventListener("click", handleLeftClick);
        rightBtn.removeEventListener("click", handleRightclick);
        tabNavList.removeEventListener("mousemove", () => {});
        tabNavList.removeEventListener("mousedown", () => {});
      };
    }, []);
    console.log("subjects for", subjects);
  
    return (
      <section>
        <div className="main-container">
          <div className="tab-nav-bar">
            <div className="tab-navigation">
              <i className="uil uil-angle-left left-btn" ref={leftBtnRef}></i>
              <i className="uil uil-angle-right right-btn" ref={rightBtnRef}></i>
              <ul className="tab-nav-list" ref={tabNavListRef}>
                {subjects.map((subject) => (
                  <li className="tab-nav-item" key={subject.id}>
                    {subject.subjectName}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="tab-content">
          {subjects.map((subject) => (
            <div className="tab" key={subject.id}>
              <div className="row">
                <div className="left-column">
                  <div className="img-card">
                    <img src={`${subject.img}`} />
                  </div>
                </div>
                <div className="right-column">
                  <div className="info">
                    <ion-icon
                      class="info-icon"
                      name="arrow-redo-outline"
                    ></ion-icon>
                    <ion-icon
                      class="info-icon"
                      name="chatbubble-ellipses-outline"
                    ></ion-icon>
                    <ion-icon class="info-icon" name="heart-outline"></ion-icon>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
}
