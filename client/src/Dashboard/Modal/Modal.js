import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialog({ show, close, add }) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    add(value);
  };

  const handleClose = () => {
    setValue("");
    close();
  };

  const handleTextChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <Dialog open={show} onClose={handleClose}>
        <DialogTitle>Create Organization</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Org name"
            type="text"
            fullWidth
            variant="standard"
            value={value}
            onChange={handleTextChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
