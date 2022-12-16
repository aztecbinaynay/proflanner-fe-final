import React from "react";
import "./Modal.css";
import { useState } from "react";
import "tachyons";

function Modal({
  OpenModal,
  modalKind,
  userEmail,
  courses,
  coursesToDelete,
  getCourses,
}) {
  const gradingSem = ["1st", "2nd"];
  const gradingYear = ["1st", "2nd", "3rd", "4th"];

  const course = courses
    .map((course) => {
      return course.course;
    })
    .flat()

  const modularity = ["full", "modular"];
  const labhrs = ["0", "1", "2", "3", "4", "5", "6"];
  const lechrs = ["1", "2", "3", "4", "5", "6"];

  const [sem, setSem] = useState("");
  const [year, setYear] = useState("");
  const [courseName, setCourseName] = useState("");
  const [mod, setMod] = useState("");
  const [lab, setLab] = useState("");
  const [lec, setLec] = useState("");
  const [startDate, setStartDate] = useState("");

  function onDeleteCourse() {
    fetch("https://modest-bike-production.up.railway.app/deletecourse", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userEmail,
        id: coursesToDelete,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.courses) {
          alert(`The courses\n\n${data.courses.join("\n")}\n\nare deleted`);
          getCourses();
          OpenModal(false);
        } else {
          alert("error: no courses selected!");
        }
      });
  }

  function onCreateCourse() {
    fetch("https://modest-bike-production.up.railway.app/createlesson", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sem: sem,
        year: year,
        courseName: courseName,
        mod: mod,
        lab: lab,
        lec: lec,
        startDate: startDate,
        email: userEmail, //email is from the parent component
      }),
    })
      .then((response) => response.json())
      .then((course) => {
        if (course.id) {
          alert("Course Created; click OK to continue");
          getCourses();
          OpenModal(false);
        } else {
          alert("Error: Course not created; Make sure all fields are filled");
        }
      });
  }

  return (
    <div className="modalBackground">
      {modalKind === "create" ? (
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <div style={{ flexGrow: 1 }}></div>
            <h1 style={{ flexGrow: 2 }}>Create a Lesson Planner</h1>
            <button
              style={{ flexGrow: 1 }}
              onClick={() => OpenModal(false)}
              className="red grow modalCreateBtn"
            >
              X
            </button>
          </div>
          {/* <div className="title">
						<h1>Create a Lesson Planner</h1>
					</div> */}
          <br />
          <div className="createForm">
            <p>Course</p>
            <select
              onChange={(e) => setCourseName(e.target.value)}
              dafaultValue={courseName}
            >
              <option value="" disabled selected>
                Choose a course
              </option>
              {course.map((course, idx) => (
                <option key={idx}>{course}</option>
              ))}
            </select>
            <p>Modularity</p>
            <select onChange={(e) => setMod(e.target.value)} dafaultValue={mod}>
              <option value="" disabled selected>
                Choose module type
              </option>
              {modularity.map((modularity, idx) => (
                <option key={idx}>{modularity}</option>
              ))}
            </select>
            <p>Grading Semester</p>
            <select onChange={(e) => setSem(e.target.value)} dafaultValue={sem}>
              <option value="" disabled selected>
                Choose a semester
              </option>
              {gradingSem.map((sem, idx) => (
                <option key={idx}>{sem}</option>
              ))}
            </select>
            <p>Grading Year</p>
            <select
              onChange={(e) => setYear(e.target.value)}
              dafaultValue={year}
            >
              <option value="" disabled selected>
                Choose a year
              </option>
              {gradingYear.map((year, idx) => (
                <option key={idx}>{year}</option>
              ))}
            </select>
            <p>No. Lab hrs</p>
            <select onChange={(e) => setLab(e.target.value)} dafaultValue={lab}>
              <option value="" disabled selected>
                Choose lab hours
              </option>
              {labhrs.map((hrs, idx) => (
                <option key={idx}>{hrs}</option>
              ))}
            </select>
            <p>No. Lec hrs</p>
            <select onChange={(e) => setLec(e.target.value)} dafaultValue={lec}>
              <option value="" disabled selected>
                Choose lec hours
              </option>
              {lechrs.map((hrs, idx) => (
                <option key={idx}>{hrs}</option>
              ))}
            </select>
            <p>Start Date</p>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <br />
          <div className="footer">
            <button
              className="grow pointer"
              onClick={() => OpenModal(false)}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button
              className="grow pointer"
              onClick={() => {
                onCreateCourse();
              }}
            >
              Create
            </button>
          </div>
        </div>
      ) : (
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button onClick={() => OpenModal(false)}>X</button>
          </div>
          <div className="title">
            <h1>
              {" "}
              Deleting a course will permanently delete it from the Dashboard
            </h1>
          </div>
          <div className="body">
            <p>Are you sure you want to Delete it?</p>
          </div>
          <div className="footer">
            <button
              className="grow pointer"
              onClick={() => OpenModal(false)}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button
              className="grow pointer"
              onClick={() => {
                onDeleteCourse();
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
