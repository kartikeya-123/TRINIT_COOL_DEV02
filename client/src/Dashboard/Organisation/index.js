import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  CircularProgress,
  Typography,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  Paper,
  Fab,
  InputBase,
  Button,
} from "@mui/material";
import { SearchRounded, GroupAddRounded } from "@mui/icons-material";

import TeamModal from "./../Modal/TeamModal";

const Organisation = ({ user }) => {
  const navigate = useNavigate();

  const [org, setOrg] = useState(null);
  const [show, setShow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    if (org) {
      setShow(org.teams);
    }
  }, [org]);

  useEffect(() => {
    const id = window.location.pathname.split("/")[2];
    axios
      .get("/api/v1/organisation/" + id)
      .then((res) => {
        setOrg(res.data.organisation);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const showTeamModal = () => {
    setShowModal(true);
  };

  const closeTeamModal = () => {
    setShowModal(false);
  };

  const addTeam = (data) => {
    const id = window.location.pathname.split("/")[2];
    axios
      .post(`/api/v1/team/create/` + id, data)
      .then((res) => {
        console.log(res.data);
        const newteam = res.data.team;
        const old = { ...org };
        old.teams.push(newteam);
        setOrg(old);
        closeTeamModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
    if (!org) return;

    if (!searchString || searchString === "") setShow(org.teams);
    else {
      setShow(
        org.teams.filter((el) =>
          el.name.toLowerCase().includes(searchString.toLowerCase())
        )
      );
    }
  }, [searchString]);

  if (show)
    return (
      <div>
        <TeamModal show={showModal} close={closeTeamModal} add={addTeam} />

        <Typography variant="h4" align="left">
          {org.name}
        </Typography>

        {user.id === org.creator ? (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
              onClick={showTeamModal}
            >
              <GroupAddRounded
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
                NEW TEAM
              </Typography>
            </Fab>
          </div>
        ) : null}

        <Paper
          style={{
            display: "flex",
            alignItems: "center",
            borderRadius: "20px",
            height: "40px",
            width: "min(90vw, 400px)",
            boxSizing: "border-box",
            margin: "30px auto 0px",
            padding: "0px 10px",
          }}
        >
          <SearchRounded style={{ paddingRight: "10px" }} />
          <InputBase
            placeholder="Search teams"
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
                    <TableCell>Team</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell align="center">Members</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {show &&
                    show.map((team) => (
                      <TableRow
                        key={team.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          cursor: "pointer",
                          transition: "all 150ms ease-in-out",
                          "&:hover": { backgroundColor: "rgb(240,240,240)" },
                        }}
                        onClick={() => {
                          navigate("/team/" + team.id);
                        }}
                      >
                        <TableCell
                          style={{
                            paddingRight: "5px",
                            paddingTop: "10px",
                            paddingBottom: "10px",
                          }}
                        >
                          <Avatar>{team.name[0]}</Avatar>
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            paddingLeft: "5px",
                          }}
                        >
                          {showName(team.name)}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={
                            {
                              // textOverflow: "ellipsis",
                              // whiteSpace: "nowrap",
                              // overfow: "hidden",
                            }
                          }
                        >
                          {team.description}
                        </TableCell>
                        <TableCell align="center">
                          {team.members ? team.members.length : 1}
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

  return (
    <div>
      <CircularProgress />
    </div>
  );
};

export default Organisation;
