import { useState, useEffect } from "react";
import axios from "axios";
import { Avatar, CircularProgress, Paper, Typography } from "@mui/material";

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
        <div>
          <Typography variant="h4" align="left">
            {bug.name}
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={bug.created.created_by.image}
              style={{ width: "30px", height: "30px", marginRight: "10px" }}
            />
            <Typography
              align="left"
              style={{ color: "grey", fontSize: "14px" }}
            >
              {bug.created.created_by.name} raised this bug on
              {" " + displayDate(bug.created.created_at)}
            </Typography>
          </div>
          <Paper style={{ textAlign: "left", padding: "20px" }}>
            {bug.description}
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
