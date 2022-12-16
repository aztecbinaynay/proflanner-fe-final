import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function MultilineTextFields({ defaultval, onPopOverState, InputSubmit }) {
  const [text, setText] = useState("");

  function displayText(inputvalue) {
    if (inputvalue === "") {
      console.log("No input");
    } else {
      console.log(inputvalue);
      InputSubmit(inputvalue);
      onPopOverState();
    }
  }

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="outlined-multiline-static"
            label={defaultval}
            multiline
            rows={4}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </Box>
      <button
        onClick={() => {
          displayText(text);
        }}
      >
        Submit
      </button>
    </div>
  );
}
