import { useState, useEffect } from "react";
import axios from "axios";
import './team.css'
import {
    Avatar,
    Paper,
    InputBase,
    TableRow,
    Table,
    TableCell,
    TableBody,
    TableContainer,
    TableHead,
} from "@mui/material";
import { SearchRounded } from "@mui/icons-material";

const Team = () => {
    console.log(window.location.pathname.split('/')[2])

    const [bugs, setBugs] = useState(null);
    const [team, setTeam] = useState(null);
    const [show, setShow] = useState(null);
    const [searchString, setSearchString] = useState("");

    useEffect(() => {
        let id = window.location.pathname.split('/')[2]
        axios
            .get("/api/v1/team/" + id, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res)
                setTeam(res.data.team);
                setBugs(res.data.bugs)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        console.log(team);
    }, [team]);

    useEffect(() => {
        if (bugs) {
            setShow(bugs)
        }
    }, [bugs]);

    return (
        <div>
            <div className="teamName">
                <h2>{team !== null ? team.name : ""}</h2>
            </div>
            <Paper
                style={{
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "20px",
                    height: "40px",
                    width: "min(90vw, 400px)",
                    boxSizing: "border-box",
                    margin: "auto",
                    padding: "0px 10px",
                }}
            >
                <SearchRounded style={{ paddingRight: "10px" }} />
                <InputBase
                    placeholder="Search Bugs"
                    autoFocus
                    value={searchString}
                    onChange={({ target }) => {
                        let text = target.value;
                        text = text.trimStart();

                        setSearchString(text);
                    }}
                />
            </Paper>
            <TableContainer
                component={Paper}
                style={{
                    margin: "50px auto",
                    width: "min(90vw,900px)",
                    borderRadius: "20px",
                }}
            >
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {/* <TableCell width={"20px"}></TableCell> */}
                            <TableCell width={"30%"} align="center">Name</TableCell>
                            <TableCell width={"30%"} align="center">Description</TableCell>
                            <TableCell align="center" width={"10%"}>Status</TableCell>
                            <TableCell align="center" width={"20%"}>Assigned To</TableCell>
                            <TableCell align="center" width={"10%"}>Priority</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* {show && 

                        } */}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Team