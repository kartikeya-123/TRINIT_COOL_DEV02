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
} from "@mui/material";
import AddRounded from "@mui/icons-material/AddRounded";
import TeamModal from "./../Modal/TeamModal.js";

const Organisation = () => {
  const navigate = useNavigate();

  const [org, setOrg] = useState(null);
  const [show, setShow] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (org) {
      setShow(org);
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

  const close = () => {
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
        close();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (show)
    return (
      <div>
        <TeamModal show={showModal} close={close} add={addTeam} />
        <Typography variant="h4" align="left">
          {show.name}
        </Typography>

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
            <AddRounded
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
                <TableCell>Description</TableCell>
                <TableCell align="center">Members</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {show &&
                show.teams.map((team) => (
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
                      {team.name}
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
      </div>
    );

  return (
    <div>
      <CircularProgress />
    </div>
  );
};

export default Organisation;
