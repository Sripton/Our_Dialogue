import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

export default function Subjectlist() {
  const [subjects, setSubjects] = useState([]);
  const { id } = useParams();

  // Fetch subjects data
  useEffect(() => {
    fetch(`/api/subjects/${id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setSubjects(data))
      .catch((err) => console.log(err));
  }, [id]);

  const leftBTNRef = useRef(null);
  const rightBTNRef = useRef(null);
  const tabNavListRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Function to manage button visibility
  const updateIconVisibility = () => {
    const tabNavList = tabNavListRef.current;

    if (tabNavList) {
      const scrollLeftValue = Math.ceil(tabNavList.scrollLeft);
      const scrollableWidth = tabNavList.scrollWidth - tabNavList.clientWidth;
      setCanScrollLeft(scrollLeftValue > 0);
      setCanScrollRight(scrollLeftValue < scrollableWidth);
    }
  };

  // Add scroll event listener on mount
  useEffect(() => {
    const tabNavList = tabNavListRef.current;
    if (tabNavList) {
      updateIconVisibility();
      tabNavList.addEventListener("scroll", updateIconVisibility);
    }

    return () => {
      if (tabNavList) {
        tabNavList.removeEventListener("scroll", updateIconVisibility);
      }
    };
  }, []);

  const scrollRight = () => {
    const tabNavList = tabNavListRef.current;
    if (tabNavList) {
      tabNavList.scrollLeft += 150;
      setTimeout(() => updateIconVisibility(), 50);
    }
    console.log(tabNavList.scrollLeft);
    console.log(tabNavList.scrollWidth - tabNavList.clientWidth);
  };

  const scrollLeft = () => {
    const tabNavList = tabNavListRef.current;
    if (tabNavList) {
      tabNavList.scrollLeft -= 150;
      setTimeout(() => updateIconVisibility(), 50);
    }
  };
  return (
    <>
      <div className="main-container">
        <div className="tab-nav-bar">
          <div className="tab-navigation">
            <i
              className="uil uil-angle-left left-btn"
              ref={leftBTNRef}
              onClick={scrollLeft}
              style={{ display: canScrollLeft ? "block" : "none" }}
            ></i>
            <i
              className="uil uil-angle-right right-btn"
              ref={rightBTNRef}
              onClick={scrollRight}
              style={{
                display: canScrollRight ? "block" : "block",
              }}
            ></i>
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
        <div className="tab">
          <div className="row">
            {subjects.map((subject) => (
              <div className="img-card" key={subject.id}>
                <img src={`${subject.img}`} alt={subject.subjectName} />
              </div>
            ))}

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
      </div>
    </>
  );
}
