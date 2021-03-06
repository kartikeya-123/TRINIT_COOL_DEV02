import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Team.css";
import {
  Avatar,
  CircularProgress,
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
  Chip,
} from "@mui/material";
import { SearchRounded, PersonAddAltRounded } from "@mui/icons-material";
import AddRounded from "@mui/icons-material/AddRounded";
import BugModal from "./../Modal/BugModal";
import MemberModal from "./../Modal/AddMember";

const Team = ({ user }) => {
  const navigate = useNavigate();

  const [bugs, setBugs] = useState(null);
  const [team, setTeam] = useState(null);
  const [show, setShow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [memberModal, setMemberModal] = useState(false);
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

  const showMemberModal = () => {
    setMemberModal(true);
  };

  const closeMemberModal = () => {
    setMemberModal(false);
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

  const addMember = () => {};

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

  useEffect(() => {
    console.log(show);
  }, [show]);

  return (
    <div>
      <BugModal show={showModal} close={closeModal} add={addBug} />
      <MemberModal
        show={memberModal}
        close={closeMemberModal}
        add={addMember}
      />
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
          gap: "20px",
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
        {team && user.id === team.creator ? (
          <Fab
            size="medium"
            variant="extended"
            sx={{
              height: "48px",
              width: "48px",
              transition: "all 200ms ease-in-out",
              "&:hover": { width: "160px" },
              "&:hover .fab-text": { opacity: "1 !important" },
              flexWrap: "nowrap",
              overflow: "hidden",
              justifyContent: "flex-start",
            }}
            onClick={showMemberModal}
            color="primary"
          >
            <PersonAddAltRounded
              style={{ transform: "translateX(calc(0.5em - 15px))" }}
            />
            <Typography
              className="fab-text"
              style={{
                whiteSpace: "nowrap",
                opacity: 0,
                transition: "all 200ms ease-in-out",
              }}
            >
              Add Member
            </Typography>
          </Fab>
        ) : null}
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
              width: "min(90vw,900px)",
              borderRadius: "20px",
            }}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell width={"15px"}></TableCell>
                  <TableCell width={"30%"}>Bug</TableCell>
                  <TableCell width={"30%"}>Description</TableCell>
                  <TableCell align="center" width={"10%"}>
                    Status
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
                        {row.status ? (
                          <Chip label={row.status} color="primary" />
                        ) : (
                          ""
                        )}
                      </TableCell>

                      <TableCell align="center">
                        {row.priority ? (
                          <Chip label={row.priority} color="success" />
                        ) : (
                          ""
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : show ? (
          <div>
            <Typography variant="h6">????????????? Nothing here ...</Typography>
          </div>
        ) : (
          <div>
            <CircularProgress />
          </div>
        )}
      </div>
    </div>
  );
};

export default Team;
