import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  Typography,
  CircularProgress,
} from "@mui/material";
import { SearchRounded } from "@mui/icons-material";

const Home = () => {
  const navigate = useNavigate();

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

  const showName = (name) => {
    if (searchString === "") return name;

    const pieces = name.toLowerCase().split(searchString.toLowerCase());

    let pos = 0;
    return pieces.map((piece, index) => {
      const curr = pos;
      pos = pos + piece.length + searchString.length;
      return (
        <span key={`${name}-${index}`}>
          {name.substr(curr, piece.length)}
          {index !== pieces.length - 1 ? (
            <b style={{ backgroundColor: "lightblue", fontWeight: 500 }}>
              {name.substr(curr + piece.length, searchString.length)}
            </b>
          ) : (
            ""
          )}
        </span>
      );
    });
  };

  useEffect(() => {
    if (!searchString || searchString === "") setShow(org);
    else {
      setShow(
        org.filter((el) =>
          el.name.toLowerCase().includes(searchString.toLowerCase())
        )
      );
    }
  }, [searchString]);

  const getMembers = (teams) => {
    let m = new Set();
    teams.forEach((team) => {
      team.members.forEach((member) => {
        m.add(member.userId);
      });
    });

    if (m.size) return m.size;
    return 1;
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
        <div
          style={{
            margin: "50px auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {show && show.length > 0 ? (
            <TableContainer
              component={Paper}
              style={{
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
                  {show.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        cursor: "pointer",
                        transition: "all 150ms ease-in-out",
                        "&:hover": { backgroundColor: "rgb(240,240,240)" },
                      }}
                      onClick={() => {
                        navigate("/org/" + row.id);
                      }}
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
                        {showName(row.name)}
                      </TableCell>
                      <TableCell align="center">
                        {row.teams ? getMembers(row.teams) : 1}
                      </TableCell>
                      <TableCell align="center">
                        {row.teams ? row.teams.length : 0}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : show ? (
            <div>
              {" "}
              <Typography variant="h6">🤷‍♂️ Nothing here ...</Typography>
            </div>
          ) : (
            <div>
              <CircularProgress />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
