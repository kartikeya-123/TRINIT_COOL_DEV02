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

export default function FormDialog({ show, close, add }) {
  const [values, setValues] = useState({
    name: "",
    description: "",
    highRoles: [],
    lowRoles: [],
  });

  const [roleHigh, setRoleHigh] = useState("");
  const [roleLow, setRoleLow] = useState("");

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

  const handleHigh = (event) => {
    if (roleHigh.length === 0) return;
    let roles = values.highRoles;
    roles.push(roleHigh);
    setValues({ ...values, highRoles: roles });
    setRoleHigh("");
  };

  const handleLow = (event) => {
    console.log(roleLow);
    if (roleLow.length === 0) return;
    let roles = values.lowRoles;
    roles.push(roleLow);
    setValues({ ...values, lowRoles: roles });
    setRoleLow("");
  };

  return (
    <div>
      <Dialog open={show} onClose={handleClose}>
        <DialogTitle>Create new team</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={values.name}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="description"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={values.description}
            onChange={handleChange}
          />
          <div>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel>Add high priority roles</InputLabel>
              <OutlinedInput
                autoFocus
                margin="dense"
                name="description"
                id="description"
                label="Add high priority roles"
                type="text"
                fullWidth
                variant="standard"
                value={roleHigh}
                onChange={(event) => setRoleHigh(event.target.value)}
                style={{ marginTop: "10px" }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton edge="end" color="primary" onClick={handleHigh}>
                      <DoneIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Stack direction="row" spacing={1}>
              {values.highRoles &&
                values.highRoles.map((role, index) => (
                  <Chip
                    label={role}
                    key={index}
                    color="primary"
                    variant="outlined"
                  />
                ))}
            </Stack>
          </div>
          <div>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel>Add low priority roles</InputLabel>
              <OutlinedInput
                autoFocus
                margin="dense"
                name="description"
                id="description"
                label="Add low priority roles"
                type="text"
                fullWidth
                variant="standard"
                value={roleLow}
                onChange={(event) => setRoleLow(event.target.value)}
                style={{ marginTop: "10px" }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton edge="end" color="primary" onClick={handleLow}>
                      <DoneIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Stack direction="row" spacing={1}>
              {values.lowRoles &&
                values.lowRoles.map((role, index) => (
                  <Chip
                    label={role}
                    key={index}
                    color="primary"
                    variant="outlined"
                  />
                ))}
            </Stack>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
