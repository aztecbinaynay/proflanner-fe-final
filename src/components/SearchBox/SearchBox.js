import React, { useState } from "react";
import { useEffect } from "react";

const SearchBox = ({ SearchChange, OpenModal, Delete }) => {
  const [deleteCourse, setDeleteCourse] = useState(false);

  const onDelete = () => {
    setDeleteCourse(!deleteCourse);
  };

  useEffect(() => {
    Delete(deleteCourse);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteCourse]);

  return (
    <div className="mw9 center ph3-ns">
      <button
        className="w-10 grow f4 link pv2 dib white bg-light-purple left pointer"
        onClick={() => OpenModal(true, "create")}
      >
        Create
      </button>
      <input
        className="f4 pa2 w-30 ml5 mr5"
        type="search"
        placeholder="search courses"
        onChange={SearchChange}
      />
      <button
        className={
          deleteCourse
            ? "w-10 grow f4 link pv2 dib white bg-gray pointer mr3"
            : "w-10 grow f4 link pv2 dib white bg-light-red pointer mr3"
        }
        onClick={onDelete}
      >
        {deleteCourse ? "Cancel" : "Delete"}
      </button>
      {deleteCourse && (
        <button
          className="w-10 grow f4 link pv2 dib white bg-red pointer"
          onClick={() => OpenModal(true, "delete")}
        >
          confirm
        </button>
      )}
    </div>
  );
};

export default SearchBox;
