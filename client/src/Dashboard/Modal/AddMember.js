import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import DoneIcon from "@mui/icons-material/Done";
import {
  Chip,
  FormControl,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";

export default function FormDialog({ show, close, add, roles }) {
  const [values, setValues] = useState({
    name: "",
    description: "",
    roles: [],
  });

  const handleSubmit = () => {
    // add(values);
    let roles = [];
    for (let role of values.highRoles) {
      roles.push({
        name: role,
        lead: true,
      });
    }

    for (let role of values.highRoles) {
      roles.push({
        name: role,
        lead: false,
      });
    }

    const data = {
      name: values.name,
      description: values.description,
      roles: roles,
    };

    add(data);
  };

  const handleClose = () => {
    // setValue("");
    close();
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <Dialog open={show} onClose={handleClose}>
        <DialogTitle>Add new member</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            name="email"
            label="Email"
            type="text"
            fullWidth
            variant="standard"
            value={values.email}
            onChange={handleChange}
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
