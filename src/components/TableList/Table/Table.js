/* eslint-disable no-unused-vars */
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "tachyons";
import TableMenu from "./TableMenu/TableMenu.js";
import "./Table.css";
import { useState, useEffect } from "react";
import "./Table.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables({
  KEY,
  ID,
  weeks,
  ilos,
  tlas,
  ats,
  topics,
  remarks,
}) {
  function onUpdate(input, id, weeks) {
    fetch("http://localhost:6060/course/lessonplanner/update", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        textArr: input,
        typeInput: id,
        id: KEY,
        weeks: weeks,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length !== 0) {
          console.log("success", data);
        } else {
          alert("error: " + data);
        }
      });
  }

  function onInputSubmitFromTableMenu(input, id) {
    setInputAndId([input, id]);
  }

  const [inputAndId, setInputAndId] = useState([]);

  useEffect(() => {
    if (inputAndId[1] === "topics") {
      setTopicsArr([...topicsArr, inputAndId[0]]);
    } else if (inputAndId[1] === "ilos") {
      setILOsArr([...ILOsArr, inputAndId[0]]);
    } else if (inputAndId[1] === "tlas") {
      setTLAsArr([...TLAsArr, inputAndId[0]]);
    } else if (inputAndId[1] === "ats") {
      setATsArr([...ATsArr, inputAndId[0]]);
    } else if (inputAndId[1] === "remarks") {
      setRemarksArr([...RemarksArr, inputAndId[0]]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputAndId]);

  const [topicsArr, setTopicsArr] = useState(topics);

  useEffect(() => {
    if (inputAndId[0] !== undefined) {
      onUpdate(topicsArr, inputAndId[1], weeks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicsArr]);

  const [ILOsArr, setILOsArr] = useState(ilos);

  useEffect(() => {
    if (inputAndId[0] !== undefined) {
      onUpdate(ILOsArr, inputAndId[1], weeks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ILOsArr]);

  const [TLAsArr, setTLAsArr] = useState(tlas);

  useEffect(() => {
    if (inputAndId[0] !== undefined) {
      onUpdate(TLAsArr, inputAndId[1], weeks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TLAsArr]);

  const [ATsArr, setATsArr] = useState(ats);

  useEffect(() => {
    if (inputAndId[0] !== undefined) {
      onUpdate(ATsArr, inputAndId[1], weeks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ATsArr]);

  const [RemarksArr, setRemarksArr] = useState(remarks);

  useEffect(() => {
    if (inputAndId[0] !== undefined) {
      onUpdate(RemarksArr, inputAndId[1], weeks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [RemarksArr]);

  return (
    <div className="ma3">
      <h1 style={{ display: "flex", alignItems: "end", marginBottom: "2px" }}>
        Week {weeks}
      </h1>
      <hr className="hrForPlanner" />
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                style={{
                  paddingBottom: "0px",
                  paddingTop: "0px",
                }}
                align="center"
              >
                <div className="headerCell">
                  <p>Topics</p>
                  <TableMenu
                    InputSubmitFromTableMenu={onInputSubmitFromTableMenu}
                    id={"topics"}
                  />
                </div>
              </StyledTableCell>
              <StyledTableCell
                style={{
                  paddingBottom: "0px",
                  paddingTop: "0px",
                }}
                align="center"
              >
                <div class="headerCell">
                  <p>ILOs</p>
                  <TableMenu
                    InputSubmitFromTableMenu={onInputSubmitFromTableMenu}
                    id={"ilos"}
                  />
                </div>
              </StyledTableCell>
              <StyledTableCell
                style={{
                  paddingBottom: "0px",
                  paddingTop: "0px",
                }}
                align="center"
              >
                <div class="headerCell">
                  <p>TLAs</p>
                  <TableMenu
                    InputSubmitFromTableMenu={onInputSubmitFromTableMenu}
                    id={"tlas"}
                  />
                </div>
              </StyledTableCell>
              <StyledTableCell
                style={{
                  paddingBottom: "0px",
                  paddingTop: "0px",
                }}
                align="center"
              >
                <div class="headerCell">
                  <p>ATs</p>
                  <TableMenu
                    InputSubmitFromTableMenu={onInputSubmitFromTableMenu}
                    id={"ats"}
                  />
                </div>
              </StyledTableCell>
              <StyledTableCell
                style={{
                  paddingBottom: "0px",
                  paddingTop: "0px",
                }}
                align="center"
              >
                <div class="headerCell">
                  <p>Remarks</p>
                  <TableMenu
                    InputSubmitFromTableMenu={onInputSubmitFromTableMenu}
                    id={"remarks"}
                  />
                </div>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ backgroundColor: "white", height: "100px" }}>
            <StyledTableCell
              className="container"
              style={{ paddingLeft: "25px" }}
            >
              <ul>
                {topicsArr.map((topic) => {
                  return (
                    <li>
                      {topic}{" "}
                      <button
                        onClick={() => {
                          const index = topicsArr.indexOf(topic);
                          if (index > -1) {
                            topicsArr.splice(index, 1);
                          }
                          setTopicsArr([...topicsArr]);
                        }}
                      >
                        x
                      </button>
                    </li>
                  );
                })}
              </ul>
            </StyledTableCell>
            <StyledTableCell
              className="container"
              style={{ paddingLeft: "25px" }}
            >
              <ul>
                {ILOsArr.map((ILO) => {
                  return (
                    <li>
                      {ILO}{" "}
                      <button
                        onClick={() => {
                          const index = ILOsArr.indexOf(ILO);
                          if (index > -1) {
                            ILOsArr.splice(index, 1);
                          }
                          setILOsArr([...ILOsArr]);
                        }}
                      >
                        x
                      </button>
                    </li>
                  );
                })}
              </ul>
            </StyledTableCell>
            <StyledTableCell
              className="container"
              style={{ paddingLeft: "25px" }}
            >
              <ul>
                {TLAsArr.map((TLA) => {
                  return (
                    <li>
                      {TLA}{" "}
                      <button
                        onClick={() => {
                          const index = TLAsArr.indexOf(TLA);
                          if (index > -1) {
                            TLAsArr.splice(index, 1);
                          }
                          setTLAsArr([...TLAsArr]);
                        }}
                      >
                        x
                      </button>
                    </li>
                  );
                })}
              </ul>
            </StyledTableCell>
            <StyledTableCell
              className="container"
              style={{ paddingLeft: "25px" }}
            >
              <ul>
                {ATsArr.map((AT) => {
                  return (
                    <li>
                      {AT}{" "}
                      <button
                        onClick={() => {
                          const index = ATsArr.indexOf(AT);
                          if (index > -1) {
                            ATsArr.splice(index, 1);
                          }
                          setATsArr([...ATsArr]);
                        }}
                      >
                        x
                      </button>
                    </li>
                  );
                })}
              </ul>
            </StyledTableCell>
            <StyledTableCell
              className="container"
              style={{ paddingLeft: "25px" }}
            >
              <ul>
                {RemarksArr.map((Remark) => {
                  return (
                    <li>
                      {Remark}{" "}
                      <button
                        onClick={() => {
                          const index = RemarksArr.indexOf(Remark);
                          if (index > -1) {
                            RemarksArr.splice(index, 1);
                          }
                          setRemarksArr([...RemarksArr]);
                        }}
                      >
                        x
                      </button>
                    </li>
                  );
                })}
              </ul>
            </StyledTableCell>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

//  ! way to find max number lenght of an array inside an object
// const obj = [
//   { employees: ["e1", "e2", "e3", "f4"] },
//   { employees: ["e4", "e5", "e6"] },
//   { employees: ["e7", "e8", "e9"] },
//   { employees: ["e10", "e11", "e12"] },
//   { employees: ["e13", "e14", "e15"] },
// ];
// const arr = Object.values(obj)
//   .map((obj) => Object.values(obj))
//   .map((a) => a[0].length);
// console.log(arr);
// const max = arr.reduce((a, b) => Math.max(a, b), -Infinity);
// console.log(max);

// <TableBody>
//             {rows.map((row) => (
//               <StyledTableRow >
//                 <StyledTableCell align="left">{row.topics}</StyledTableCell>
//                 <StyledTableCell align="left">
//                   <ul>
//                     <li>{row.ILOs}</li>
//                   </ul>
//                 </StyledTableCell>
//                 <StyledTableCell align="left">{row.TLAs}</StyledTableCell>
//                 <StyledTableCell align="left">{row.ATs}</StyledTableCell>
//                 <StyledTableCell align="left">{row.Remarks}</StyledTableCell>
//               </StyledTableRow>
//             ))}
//           </TableBody>

// const rows = [
//   createData(
//     "Explain the key concepts of the Software Design process and demonstrate how the essential design principles are applied within it",
//     "Explain the key concepts of the Software Design process and demonstrate how the essential design principles are applied within it",
//     "Explain the key concepts of the Software Design process and demonstrate how the essential design principles are applied within it",
//     "Explain the key concepts of the Software Design process and demonstrate how the essential design principles are applied within it",
//     "Explain the key concepts of the Software Design process and demonstrate how the essential design principles are applied within it"
//   ),
//   createData("Ice cream sandwich", 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

// function createData(topics, ILOs, TLAs, ATs, Remarks) {
//   return { topics, ILOs, TLAs, ATs, Remarks };
// }
