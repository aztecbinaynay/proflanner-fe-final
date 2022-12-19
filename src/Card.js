import React from "react";
import "./Card.css";
import cpe_029 from "./CPE_029.png";
import { useState, useEffect } from "react";
import "tachyons";
// path to picture cannot be outsode of src?

const Card = ({ name, modularity,gradingyear, gradingsem, lechrs, labhrs, id, deleteMode, ClickedCourses }) => {
  // const { name, email, id } = props;
  const [clicked, setClicked] = useState(false);
  // const [clcikedCourses, setClickedCourses] = useState([]);

  function onClicked(id) {
    setClicked(!clicked);
    ClickedCourses(id);
  }

  useEffect(() => {
    console.log("button clicked? ", clicked, id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clicked]);

  useEffect(() => {
    console.log("class deleteMode", deleteMode);
    setClicked(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteMode]);

  return (
    <div
      onClick={() => onClicked(id)}
      // className="pointer tc bg-light-green dib ma2 shadow-5 dim"
      // {...(clicked && deleteMode ? { style: { border: "5px solid red" } } : {})}
      className="pointer tc bg-light-green dib ma2 shadow-5 dim"
      {...(deleteMode
        ? clicked
          ? { style: { border: "5px solid red" } }
          : {}
        : {})}
    >
      {/* css to add for when clicked: b--dark-red br2 dim-on-click */}
      <img
        src={cpe_029} //previoulsy {`https://robohash.org/${id}?200x200`}
        alt={`Courses for ${name}`}
        srcset=""
      />
      <hr />
      <div className="tl innerDiv">
        <p>{name}</p>
        <p>modularity: {modularity}</p>
        <p>year/sem: {gradingyear}/{gradingsem}</p>
        <p>lecture hours: {lechrs}</p>
        <p>laboratory hours: {labhrs}</p>
      </div>
    </div>
  );
};

export default Card;
