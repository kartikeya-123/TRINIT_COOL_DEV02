import { useState, useEffect } from "react";
import axios from "axios";
import {
  Avatar,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from "@mui/material";

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

  if (bug)
    return (
      <div>
        <div style={{ textAlign: "left" }}>
          <Typography variant="h4" align="left">
            {bug.name}
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Chip
              label={bug.status}
              color={
                bug.status === "raised"
                  ? "primary"
                  : bug.status === "assigned"
                  ? "warning"
                  : "success"
              }
              size="small"
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "5px 10px",
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
          <Paper style={{ textAlign: "left", margin: "20px 0px" }}>
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
