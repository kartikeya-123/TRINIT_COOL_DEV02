import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Team.css";
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
  Fab,
  Typography,
} from "@mui/material";
import { SearchRounded } from "@mui/icons-material";
import AddRounded from "@mui/icons-material/AddRounded";
import BugModal from "./../Modal/BugModal";

const Team = () => {
  const navigate = useNavigate();

  const [bugs, setBugs] = useState(null);
  const [team, setTeam] = useState(null);
  const [show, setShow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    let id = window.location.pathname.split("/")[2];
    axios
      .get("/api/v1/team/" + id, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setTeam(res.data.team);
        setBugs(res.data.bugs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log(show);
  }, [show]);

  useEffect(() => {
    if (bugs) {
      setShow(bugs);
    }
  }, [bugs]);

  const showBugModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addBug = (bugName, bugDescription) => {
    const data = {
      name: bugName,
      description: bugDescription,
      team: team.id,
    };
    axios
      .post("/api/v1/bug/team/" + team.id, data)
      .then((res) => {
        console.log(res.data);
        let oldBugs = [...bugs];
        oldBugs.push(res.data.bug);
        setBugs(oldBugs);
        closeModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (!searchString || searchString === "") setShow(bugs);
    else {
      setShow(
        bugs.filter((el) =>
          el.name.toLowerCase().includes(searchString.toLowerCase())
        )
      );
    }
  }, [searchString]);

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

  return (
    <div>
      <BugModal show={showModal} close={closeModal} add={addBug} />
      <div className="teamName">
        <h2>{team !== null ? team.name : ""}</h2>
      </div>
      <div className="teamDescription">
        {team !== null ? team.description : ""}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "12px",
          marginBottom: "12px",
        }}
      >
        <Fab
          size="medium"
          variant="extended"
          sx={{
            height: "48px",
            width: "48px",
            transition: "all 200ms ease-in-out",
            "&:hover": { width: "140px" },
            "&:hover .fab-text": { opacity: "1 !important" },
            flexWrap: "nowrap",
            overflow: "hidden",
            justifyContent: "flex-start",
          }}
          onClick={showBugModal}
        >
          <AddRounded style={{ transform: "translateX(calc(0.5em - 15px))" }} />
          <Typography
            className="fab-text"
            style={{
              whiteSpace: "nowrap",
              opacity: 0,
              transition: "all 200ms ease-in-out",
            }}
          >
            NEW BUG
          </Typography>
        </Fab>
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
              <TableCell width={"15px"}></TableCell>
              <TableCell width={"30%"}>Name</TableCell>
              <TableCell width={"30%"}>Description</TableCell>
              <TableCell align="center" width={"10%"}>
                Status
              </TableCell>
              <TableCell align="center" width={"20%"}>
                Assigned To
              </TableCell>
              <TableCell align="center" width={"10%"}>
                Priority
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {show &&
              show.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                    transition: "all 150ms ease-in-out",
                    "&:hover": { backgroundColor: "rgb(240,240,240)" },
                  }}
                  onClick={() => {
                    navigate("/bug/" + row.id);
                  }}
                >
                  <TableCell
                    style={{
                      paddingRight: "8px",
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
                      paddingLeft: "16px",
                    }}
                  >
                    {showName(row.name)}
                  </TableCell>
                  <TableCell>
                    {row.description ? row.description : ""}
                  </TableCell>
                  <TableCell align="center">
                    {row.status ? row.status : ""}
                  </TableCell>
                  <TableCell align="center">
                    {row.assigned ? row.assigned.assigned_to : ""}
                  </TableCell>
                  <TableCell align="center">
                    {row.priority ? row.priority : ""}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Team;
