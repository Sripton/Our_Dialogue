import React, { useEffect, useState } from "react";

export default function Contentlist({ directions }) {
  const [boxes, setBoxes] = useState(directions);
  const [removedBoxes, setRemovedBoxes] = useState([]);

  const handleClick = (box) => {
    setBoxes(boxes.filter((b) => b !== box));
    setRemovedBoxes([...removedBoxes, box]);
  };

  console.log('directions', directions);
  console.log('boxes', boxes);
  return (
    <>
      <div className="container">
        {directions?.map((direction) => (
          <div
            className="box"
            style={{ backgroundImage: `url(${direction.img})` }}
            key={direction.id}
            onClick={() => handleClick(direction)}
          ></div>
        ))}
      </div>
      <div className="container__content">
        {directions?.map((direction) => (
          <div className="content" key={direction.id}>
            <h2 className="title">{direction.title}</h2>
            <p className="description">{direction.description}</p>
            <button>Read More</button>
          </div>
        ))}
      </div>
    </>
  );
}
