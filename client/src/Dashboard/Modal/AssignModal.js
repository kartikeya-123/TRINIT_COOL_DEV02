import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


export default function AssignModal({ show, close, add }) {

    const [email, setEmail] = useState("");
    const [priority, setPriority] = useState("");

    const handleSubmit = () => {
        add(email, priority);
    };

    const handleClose = () => {
        setEmail("");
        setPriority("");
        close();
    };

    const handleTextChange = (event) => {
        if (event.target.id === 'email') {
            setEmail(event.target.value)
        } else {
            setPriority(event.target.value)
        }
    };

    return (
        <div>
            <Dialog open={show} onClose={handleClose}>
                <DialogTitle>Assign Bug</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Assign to email"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={email}
                        onChange={handleTextChange}
                    />
                    <DropDownMenu priority={priority} setPriority={setPriority} priorities={["high", "medium", "low"]} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const DropDownMenu = ({ priority, setPriority, priorities }) => {
    const [isActive, setIsActive] = useState(false);
    console.log(priorities
    )
    return (
        <div className='dropdown'>
            <div style={{
                marginTop:"12px",
                marginBottom:"6px"
            }}>Choose Priority</div>
            <div className='dropdown_btn' onClick={(e) => setIsActive(!isActive)}>
                <div>{priority != "" ? priority : "Choose"}</div>
                {/* <div>Open</div> */}
                <KeyboardArrowDownIcon style={{
                    width: '20px',
                    height: '20px'
                }} />
            </div>
            {isActive && (
                <div className='dropdown_content'>
                    {priorities
                        .map(memberSelected => (
                            <div className='dropdown_item'
                                onClick={e => {
                                    setPriority(memberSelected)
                                    setIsActive(false)
                                }}>
                                {memberSelected}
                            </div>
                        ))}
                </div>
            )}
        </div>
    )
}
