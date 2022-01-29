import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

import {
  HomeRounded,
  GroupsRounded,
  LogoutRounded,
  PersonRounded,
} from "@mui/icons-material";

const NavBar = ({ user }) => {
  const navigate = useNavigate();

  const [menuAnchor, setMenuAnchor] = useState(null);

  const toggleMenu = ({ currentTarget }) => {
    setMenuAnchor(currentTarget);
  };

  const handleClose = () => {
    setMenuAnchor(null);
  };

  return (
    <div style={{ padding: "0px 20px" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">BTS</Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          {/* <Typography variant="h5" style={{ fontSize: "16px" }}>
            {user.name}
          </Typography> */}
          <IconButton onClick={toggleMenu} id="menu-button">
            <Avatar
              sx={{ width: 34, height: 34 }}
              alt="profile_avatar"
              src={user.image}
            />
          </IconButton>

          <Menu
            id="basic-menu"
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "menu-button",
            }}
          >
            <MenuItem
              onClick={() => {
                navigate("/home");
                handleClose();
              }}
            >
              <ListItemIcon>
                <HomeRounded />
              </ListItemIcon>
              <ListItemText>Home</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/profile");
                handleClose();
              }}
            >
              <ListItemIcon>
                <PersonRounded />
              </ListItemIcon>
              <ListItemText>Your Profile</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/teams");
                handleClose();
              }}
            >
              <ListItemIcon>
                <GroupsRounded />
              </ListItemIcon>
              <ListItemText>Your Teams</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
              }}
            >
              <ListItemIcon>
                <LogoutRounded />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </div>
      </header>
    </div>
  );
};

export default NavBar;
