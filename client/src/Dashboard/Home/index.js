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

const Home = () => {
  const [org, setOrg] = useState(null);
  const [show, setShow] = useState(null);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    console.log(org);
    if (org) setShow(org);
  }, [org]);

  useEffect(() => {
    axios
      .get("api/v1/organisation/all", {
        withCredentials: true,
      })
      .then((res) => {
        setOrg(res.data.organisations);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getMembers = (teams) => {
    let m = new Set();
    teams.forEach((team) => {
      team.members.forEach((member) => {
        m.add(member.userId);
      });
    });
    console.log(m);
    return m.size;
  };
  return (
    <div>
      <div>
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
            placeholder="Search organisations"
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
            width: "min(90vw,600px)",
            borderRadius: "20px",
          }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell width={"20px"}></TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="center">Members</TableCell>
                <TableCell align="center">Teams</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {show &&
                show.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      style={{
                        paddingRight: "5px",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                      }}
                    >
                      <Avatar>{row.name[0]}</Avatar>
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{
                        paddingLeft: "5px",
                      }}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="center">
                      {row.teams ? getMembers(row.teams) : 0}
                    </TableCell>
                    <TableCell align="center">
                      {row.teams ? row.teams.length : 0}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Home;
