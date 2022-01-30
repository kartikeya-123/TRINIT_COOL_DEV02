import React, { useEffect, useState } from "react";
import "./Profile.css";
import { Avatar, Grid, Button, Card, Fab } from "@mui/material";
import BugReportIcon from "@mui/icons-material/BugReport";
import axios from "axios";
import Modal from "./../Modal/Modal";
import { AddRounded } from "@mui/icons-material";
import colors from "./../assets/colors.js";
import { useNavigate } from "react-router-dom";

const Profile = ({ user }) => {
  return (
    <div className="body">
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <ProfileDetails user={user} />
        </Grid>
        <Grid item xs={8}>
          <ProfileStats orgs={user.organisations} />
        </Grid>
      </Grid>
    </div>
  );
};

const ProfileDetails = (props) => {
  return (
    <div className="profileDetails">
      <Avatar sx={{ width: 160, height: 160 }} src={props.user.image} />
      <h3>{props.user.name}</h3>
      <p style={{ marginBottom: "12px", marginTop: 0 }}>{props.user.email}</p>
      {/* <div className="teamsBox">
        <div className='buttonRoute'>
          <BugReportIcon style={{ 'paddingRight': '6px', 'color': '#ff7043' }} />
          <div className='buttonHeading'>
            <p style={{ 'marginBottom': 0, 'color': '#616161' }}>My Teams</p>
          </div>
          <ArrowForwardIosIcon style={{ 'height': '14px', 'width': '14px' }} />
        </div>
      </div> */}
      <Button variant="outlined" className="buttonTeams">
        My Teams
      </Button>
      <Button variant="outlined" className="buttonTeams">
        View Bugs
      </Button>
    </div>
  );
};

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  console.log(name);
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name[0]}${name[1]}`,
  };
}

const ProfileStats = ({ orgs, ...props }) => {
  const navigate = useNavigate();

  const [organisations, setOrganisations] = useState(orgs);
  const [show, setShow] = useState(false);

  // useEffect(() => {
  //   setOrganisations(props.organisations);
  // }, []);

  const showOrgModal = () => {
    setShow(true);
  };

  const close = () => {
    setShow(false);
  };

  const addOrganisation = (orgName) => {
    const data = {
      name: orgName,
    };

    axios
      .post("/api/v1/organisation/create", data)
      .then((res) => {
        let oldOrgs = [...organisations];
        oldOrgs.push(res.data.organisation);
        setOrganisations(oldOrgs);
        close();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="profileStats">
      {/* <h3>Stats</h3> */}
      <Modal show={show} close={close} add={addOrganisation} />
      <div className="teamsBox">
        {/* <div className='stat'>
                <BugReportIcon style={{ 'paddingRight': '6px', 'color': '#ff7043' }} />
                <div className='heading'>
                    <p style={{ 'marginBottom': 0, 'color': '#ff7043' }}>Bugs In Progress</p>
                </div>
            </div> */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <div
            className="heading"
            style={{
              margin: 0,
              padding: 0,
            }}
          >
            My Organizations
          </div>
          <Fab
            onClick={showOrgModal}
            size="small"
            variant="outlined"
            color="primary"
          >
            <AddRounded />
          </Fab>
        </div>
        <Grid container spacing={2} alignItems="stretch">
          {organisations !== null ?
            organisations.map((org, index) => {
              const ind = Math.floor(Math.random() * 100) % colors.length;
              console.log(ind);
              return (
                <Grid
                  item
                  xs={3}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  key={index}
                >
                  <Card
                    style={{
                      width: "100%",
                      height: "150px",
                      padding: "10px 10px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer"
                    }}
                    onClick={() => {
                      navigate("/org/" + org.id);
                    }}
                  >
                    <Avatar
                      style={{
                        width: "80px",
                        height: "80px",
                      }}
                      sx={{
                        bgcolor: colors[ind].bgColor,
                        color: colors[ind].color,
                      }}
                    >
                      {org.name[0]}
                    </Avatar>
                    <p
                      style={{
                        textOverflow: "ellipsis",
                        display: "block",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        width: "100%",
                      }}
                    >
                      {org.name}
                    </p>
                  </Card>
                </Grid>
              );
            }) : <p style={{
              display: 'flex',
              justifyContent: "center",
              marginLeft: "16px",
              color:"#757575"
              // width: "100%"
            }}>
              You are not part of any organization
            </p>}
        </Grid>
        {/* {props.teams.map((team) => {
        return <div className='teamCard'>
          <p>{team}</p>
        </div>
      })} */}
      </div>
      <div className="statsBugs">
        <div className="stat" style={{ border: "1px solid #ff7043" }}>
          <BugReportIcon style={{ paddingRight: "6px", color: "#ff7043" }} />
          <div className="heading">
            <p style={{ marginBottom: 0, color: "#ff7043" }}>Pending Bugs: 0</p>
          </div>
        </div>
        <div className="stat" style={{ border: "1px solid green" }}>
          <BugReportIcon style={{ paddingRight: "6px", color: "green" }} />
          <div className="heading">
            <p style={{ marginBottom: 0, color: "green" }}>Bugs Resolved:0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
