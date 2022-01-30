import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function BugModal({ show, close, add }) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = () => {
        add(name, description);
    };

    const handleClose = () => {
        setName("");
        setDescription("");
        close();
    };

    const handleTextChange = (event) => {
        if (event.target.id === 'name') {
            setName(event.target.value)
        } else {
            setDescription(event.target.value)
        }
    };

    return (
        <div>
            <Dialog open={show} onClose={handleClose}>
                <DialogTitle>Raise Bug</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Bug name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={name}
                        onChange={handleTextChange}
                    />
                    <TextField
                        // autoFocus
                        margin="dense"
                        id="description"
                        label="Bug Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={description}
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