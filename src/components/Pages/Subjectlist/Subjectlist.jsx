import React, { useEffect, useState, useRef } from "react";
import { useParams, NavLink } from "react-router-dom";

export default function Subjectlist() {
  const [subjects, setSubjects] = useState([]);
  const { id } = useParams();

  const [tabIndex, setTabIndex] = useState(1);
  const [tabIndexSix, setTabIndexSix] = useState(6);
  const [tabIndexTvelwe, setTabIndexTvelwe] = useState(12);
  const [tabIndexEight, setTabIndexEight] = useState(18);

  // Fetch subjects data
  useEffect(() => {
    fetch(`/api/subjects/${id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => setSubjects(data))
      .catch((err) => console.log(err));
  }, []);

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
    document.body.style.backgroundColor = "#2e2e41";

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
  };

  const scrollLeft = () => {
    const tabNavList = tabNavListRef.current;
    if (tabNavList) {
      tabNavList.scrollLeft -= 150;
      setTimeout(() => updateIconVisibility(), 50);
    }
  };
  const handleTabClick = (index) => {
    setTabIndex(index);
    setTabIndexSix(index);
    setTabIndexTvelwe(index);
    setTabIndexEight(index);
  };

  return (
    <>
      <section className="main-container">
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
              style={{ display: canScrollRight ? "block" : "block" }}
            ></i>
            <ul className="tab-nav-list" ref={tabNavListRef}>
              {subjects.map((subject) => (
                <li
                  className={`tab-nav-item ${
                    tabIndex === subject.id ||
                    tabIndexSix === subject.id ||
                    tabIndexTvelwe === subject.id ||
                    tabIndexEight === subject.id
                      ? "tab-nav-item-active"
                      : ""
                  }`}
                  key={subject.id}
                  onClick={() => handleTabClick(subject.id)}
                >
                  {subject.subjectName}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="tab-content">
          {subjects.map((subject) => (
            <div
              className={`tab ${
                tabIndex === subject.id ||
                tabIndexSix === subject.id ||
                tabIndexTvelwe === subject.id ||
                tabIndexEight === subject.id
                  ? "_active-tab "
                  : ""
              }`}
              key={subject.id}
            >
              <div className="row">
                <div className="left-column">
                  {" "}
                  <div className="img-card">
                    <img className="tab-img" src={`${subject.img}`} />
                  </div>
                </div>

                <div className="right-column">
                  <div className="info">
                    <ion-icon
                      class="info-icon"
                      name="arrow-redo-outline"
                    ></ion-icon>

                    <NavLink to={`/addposts/${subject.id}`}>
                      {" "}
                      <ion-icon
                        class="info-icon"
                        name="chatbubble-ellipses-outline"
                      >
                        {" "}
                      </ion-icon>
                    </NavLink>

                    <ion-icon class="info-icon" name="heart-outline"></ion-icon>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
