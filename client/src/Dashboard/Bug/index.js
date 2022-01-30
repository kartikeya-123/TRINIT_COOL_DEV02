import { useState, useEffect } from "react";
import axios from "axios";
import './Bug.css';
import {
  Avatar,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Typography,
  Fab,
  Button
} from "@mui/material";
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import AssignModal from "../Modal/AssignModal";
import {
  BugReportRounded,
  AlbumRounded,
  CheckRounded,
} from "@mui/icons-material";
import { padding } from "@mui/system";

const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Oct",
  "Nov",
  "Dec",
];

const Bug = ({ user }) => {
  const [bug, setBug] = useState(null);
  const [team, setTeam] = useState(null);
  const [assignedTo, setAssignedTo] = useState(null);
  const [priority, setPriority] = useState('');
  const [showModal, setShowModal] = useState(false);


  const displayDate = (date) => {
    const d = new Date(date);

    return month[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
  };

  useEffect(() => {
    const id = window.location.pathname.split("/")[2];

    axios
      .get("/api/v1/bug/" + id)
      .then((res) => {
        setBug(res.data.bug);
        console.log(res.data.bug);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (bug !== null) {
      setAssignedTo(bug.assigned ? bug.assigned.assigned_to : "")
      setPriority(bug.priority ? bug.priority : "")
      const id = bug.team
      axios
        .get("/api/v1/team/" + id, {
          withCredentials: true
        })
        .then((res) => {
          setTeam(res.data.team);
          console.log(res.data.team);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [bug]);

  const closeBug = () => {
    axios
      .patch("/api/v1/bug/resolve/" + bug.id)
      .then((res) => {
        // let oldBugs = [...bugs];
        // oldBugs.push(res.data.bugs);
        setBug(res.data.bug);
        console.log(res.data)
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const showBugModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false)
  }

  const addBug = (assignedToEmail, priorityBug) => {
    const data = {
      email: assignedToEmail,
      priority: priorityBug
      // team: team.id 
    };
    console.log(data)
    axios
      .patch("/api/v1/bug/assign/" + bug.id, data)
      .then((res) => {
        // let oldBugs = [...bugs];
        // oldBugs.push(res.data.bugs);
        setBug(res.data.bug);
        console.log(res.data)
        closeModal();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  if (bug)
    return (
      <div>
        <AssignModal show={showModal} close={closeModal} add={addBug} />
        <div style={{ textAlign: "left" }}>
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <div style={{ display: "flex", flexDirection: 'column', justifyContent: 'start' }}>
                <Typography variant="h4" align="left">
                  {bug.name}
                </Typography>
                <div>
                  <Chip
                    label={bug.status}
                    icon={
                      bug.status === "raised" ? (
                        <BugReportRounded />
                      ) : bug.status === "assigned" ? (
                        <AlbumRounded />
                      ) : (
                        <CheckRounded />
                      )
                    }
                    color={
                      bug.status === "raised"
                        ? "primary"
                        : bug.status === "assigned"
                          ? "warning"
                          : "success"
                    }
                    size="small"
                  />
                  {bug.priority ?
                    <Chip
                      label={bug.priority + " Priority"}
                      size="small"
                      style={{
                        marginLeft: '6px',
                        backgroundColor: bug.priority === "high"
                          ? "orange"
                          : bug.priority === "medium"
                            ? "gold"
                            : "green"
                      }}
                    />
                    : null}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "5px 0px",
                    }}
                  >
                    <Typography
                      align="left"
                      style={{ color: "grey", fontSize: "14px" }}
                    >
                      {bug.created.created_by.name} raised this bug on
                      {" " + displayDate(bug.created.created_at)}
                    </Typography>
                  </div>
                </div>
              </div>
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
                <ModeEditRoundedIcon
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
                  ASSIGN BUG
                </Typography>
              </Fab>
            </div>
          </div>
          <Paper
            style={{ textAlign: "left", margin: "20px 0px", minWidth: "50vw" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "5px 10px",
                backgroundColor: "rgb(250,250,250)",
              }}
            >
              <Avatar
                src={bug.created.created_by.image}
                style={{ width: "30px", height: "30px", marginRight: "10px" }}
              />
              <Typography
                align="left"
                style={{ color: "grey", fontSize: "14px" }}
              >
                {bug.created.created_by.name} described this bug as
              </Typography>
            </div>
            <Divider />
            <div style={{ padding: "10px", paddingLeft: "20px" }}>
              {bug.description}
            </div>
          </Paper>
          {bug.status!=='resolved' ? <div style={{
            // width:'100%',
            display: 'flex',
            justifyContent: 'center',
            fontSize: '20px'
          }} >
            <Button style={{
              fontSize:'20px'
            }} onClick={closeBug}>Close Bug</Button>
          </div> : null}
        </div>
      </div>
    );

  return (
    <div>
      <CircularProgress />
    </div>
  );
};

export default Bug;
