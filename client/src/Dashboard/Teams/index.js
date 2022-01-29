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

    useEffect(() => {
        // axios
        //     .get("api/v1/organisation/all", {
        //         withCredentials: true,
        //     })
        //     .then((res) => {
        //         setOrg(res.data.organisations);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    }, []);


    return (
        <div>
            Team
        </div>
    )
}

export default Team