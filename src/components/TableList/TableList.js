import "./TableList.css";
import { useState, useEffect } from "react";
import Table from "./Table/Table.js";
import "tachyons";

const TableList = ({ coursesToOpen }) => {
  const [tableInfo, setTableInfo] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:6060/course/lessonplanner/${coursesToOpen}`)
      .then((response) => {
        return response.json();
      })
      .then((users) => {
        setTableInfo(users);
      });
  }, [coursesToOpen]);

  return (
    <div>
      {tableInfo.length === 0 ? (
        <h1>LOADING</h1>
      ) : (
        tableInfo.map((user) => {
          return (
            <Table
              KEY={coursesToOpen}
              ID={coursesToOpen}
              weeks={user.weeks}
              ilos={user.ilos}
              tlas={user.tlas}
              ats={user.ats}
              topics={user.topics}
              remarks={user.remarks}
            />
          );
        })
      )}
    </div>
  );
};

export default TableList;
