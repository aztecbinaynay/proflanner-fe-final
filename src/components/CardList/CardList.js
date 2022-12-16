import Card from "../../Card";
import "tachyons";
import React, { useState, useEffect } from "react";

const CardList = ({
  robots,
  deleteMode,
  onCoursesToDelete,
  onCoursesToOpen,
  onRouteChange
}) => {
  const [clickedCourses, setClickedCourses] = useState([]);
  const [courseToOpen, setCourseToOpen] = useState("");

  function onClickedCourses(id) {
    if (id.length !== 0 && deleteMode) {
      id = parseInt(id);
      if (deleteMode) {
        if (clickedCourses.includes(id)) {
          setClickedCourses(clickedCourses.filter((course) => course !== id));
        } else {
          setClickedCourses([...clickedCourses, id]);
        }
      }
    } else if (id.length !== 0 && !deleteMode) {
      setCourseToOpen(Number(id));
    }
  }

  useEffect(() => {
    onCoursesToOpen(courseToOpen);
    if (courseToOpen !== "") {
      onRouteChange("planner");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseToOpen]);

  useEffect(() => {
    console.log("clicked courses:", clickedCourses);
    onCoursesToDelete(clickedCourses);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedCourses]);

  useEffect(() => {
    console.log("deleteMode", deleteMode);
    setClickedCourses([]);
  }, [deleteMode]);

  return (
    <div className="dtc">
      {robots.map((user) => {
        return (
          <Card
            deleteMode={deleteMode}
            key={user.id}
            id={user.id}
            name={user.course}
            email={user.email}
            ClickedCourses={onClickedCourses}
            // onClick={onClick(user.id)}
          />
        );
      })}
    </div>
  );
};

export default CardList;
