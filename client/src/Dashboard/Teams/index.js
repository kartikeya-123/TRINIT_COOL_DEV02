import { useState, useEffect } from "react";
import axios from "axios";
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

    const [team, setTeam] = useState(null);
    const [searchString, setSearchString] = useState("");

    useEffect(() => {
        let id = window.location.pathname.split('/')[2]
        axios
            .get("api/v1/team/"+id, {
                withCredentials: true,
            })
            .then((res) => {
                setTeam(res.data.organisations);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
      console.log(team);
    }, [team]);
    

    return (
        <div>
            <div>
                Team Name
            </div>
        </div>
    )
}

export default Team