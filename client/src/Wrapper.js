import React, { Component } from "react";
import { CookiesProvider, withCookies } from "react-cookie";

import { CircularProgress } from "@mui/material";

import axios from "axios";
import Login from "./views/auth/Login";
import Home from "./Dashboard/Home";
import NavBar from "./Dashboard/NavBar";
import DashboardLayout from "./Dashboard/DashboardLayout";

class Wrapper extends Component {
  state = {
    isLoggedIn: false,
    user: null,
    isLoading: true,
    loggingOut: false,
  };

  getUser = (cookies) => {
    axios
      .get("/api/v1/user/profile", {
        withCredentials: true,
      })
      .then((res) => {
        // //console.log(res.data.data.user);
        this.setState({
          user: res.data.user,
          isLoggedIn: cookies ? cookies.isLoggedIn : this.state.isLoggedIn,
          isLoading: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  checkIsLoggedIn = () => {
    const cookies = this.props.cookies.cookies;

    if (cookies.userData) {
      this.getUser(cookies);
    } else {
      this.setState({ isLoading: false });
    }
  };

  componentDidMount = () => {
    this.checkIsLoggedIn();
  };

  getLoggedInUser = (response) => {
    this.setState({ user: response.data.user, isLoggedIn: true });

    const userData = {
      name: response.data.user.name,
      email: response.data.user.email,
      role: response.data.user.role,
      image: response.data.user.image,
    };
    const cookies = this.props.cookies;
    cookies.set("userData", userData, {
      path: "/",
      expires: new Date(response.data.expireAt),
    });
    cookies.set("isLoggedIn", true, {
      path: "/",
      expires: new Date(response.data.expireAt),
    });
    cookies.set("JWTClient", response.data.token, {
      path: "/",
      expires: new Date(response.data.expireAt),
    });
  };

  load = (val) => {
    this.setState({ isLoading: val });
  };

  logOut = (val) => {
    this.setState({ loggingOut: val });
  };

  render() {
    return (
      <div>
        {!this.state.isLoading && !this.state.loggingOut ? (
          <>
            {this.state.isLoggedIn && this.state.user ? (
              <DashboardLayout user={this.state.user} />
            ) : (
              <div>
                <Login sucessLogin={this.getLoggedInUser} load={this.load} />
              </div>
            )}
          </>
        ) : this.state.loggingOut ? (
          <div
            style={{
              display: "flex",
              height: "100vh",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <CircularProgress />
              <h3 style={{ marginLeft: "20px" }}>Logging Out...</h3>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              height: "100vh",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <CircularProgress />
              <h3 style={{ marginLeft: "20px" }}>Loading...</h3>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withCookies(Wrapper);
