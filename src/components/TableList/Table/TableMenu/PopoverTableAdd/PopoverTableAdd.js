import * as React from "react";
import Popover from "@mui/material/Popover";
import TableAdd from "./TableAdd/TableAdd.js";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import "tachyons";

export default function BasicPopover({ text, InputSubmitFromTableMenu }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  function onInputSubmit(input) {
    InputSubmitFromTableMenu(input);
  }

  return (
    <div>
      <div className = "dt" aria-describedby={id} variant="contained" onClick={handleClick}>
      {text === "text" ? (
        <><TextFieldsIcon className = "dtc" color="secondary" /><p>n/a</p></> //not yet implemented
      ) : (
        <FormatListBulletedIcon className = "dtc" color="primary" />
      )} <p className = "dtc" >| {text}</p>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <TableAdd InputSubmit={onInputSubmit} onPopOverState={handleClose} defaultval={text} />
      </Popover>
    </div>
  );
}
