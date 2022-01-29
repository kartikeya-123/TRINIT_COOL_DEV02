import React, { useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";
import axios from "axios";
// @material-ui/core components

import { Box, Button, Card, CardHeader, Grid } from "@mui/material";
// import { makeStyles } from "@material-ui/core/styles";
// import { useTheme } from "@material-ui/core/styles";
// import Box from "@material-ui/core/Box";
// import Button from "@material-ui/core/Button";
// import Card from "@material-ui/core/Card";
// import CardHeader from "@material-ui/core/CardHeader";

// import Grid from "@material-ui/core/Grid";

// @material-ui/icons components

// core components
// import componentStyles from "assets/theme/views/auth/login.js";

// const useStyles = makeStyles(componentStyles);

const Login = ({ sucessLogin, load }) => {
  //   const classes = useStyles();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const successResponseGoogle = (response) => {
    console.log(response.tokenId);
    load(true);
    axios
      .post(
        "/api/v1/auth/login",
        { tokenId: response.tokenId },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        ////console.log(response.data);
        sucessLogin(response);
        load(false);
      })
      .catch((err) => {
        console.log(err);
        load(false);
      });
    ////console.log("success");
  };
  const failureResponseGoogle = (response) => {
    ////console.log("he2");
    alert("Please try again");
  };

  const submitCredentials = (event) => {
    event.preventDefault();
    const data = { email: values.email };
    axios
      .post("/api/v1/auth/testLogin", data, { withCredentials: true })
      .then((response) => {
        ////console.log(response.data);
        sucessLogin(response);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Grid item xs={12} lg={5} md={7}>
        <Card>
          <CardHeader
            title={
              <Box
                fontSize="80%"
                fontWeight="400"
                component="small"
                color="grey"
              >
                Sign in with your gmail account
              </Box>
            }
            titleTypographyProps={{
              component: Box,
              textAlign: "center",
              marginBottom: "1rem!important",
              marginTop: ".5rem!important",
              fontSize: "1rem!important",
            }}
            subheader={
              <Box textAlign="center">
                <GoogleLogin
                  className="google-login"
                  clientId="814516511786-qf98p6b39h7722jgukj9hs8bts74mhgs.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <Button
                      variant="contained"
                      //   classes={{ root: classes.buttonRoot }}
                      onClick={renderProps.onClick}
                    >
                      <Box component="span" marginRight="4px">
                        {/* <Box
                          alt="..."
                          component="img"
                          width="20px"
                        //   className={classes.buttonImg}
                          src={
                            require("assets/img/icons/common/google.svg")
                              .default
                          }
                        ></Box> */}
                      </Box>
                      <Box component="span" marginLeft=".75rem">
                        Google
                      </Box>
                    </Button>
                  )}
                  // isSignedIn={true}
                  onSuccess={successResponseGoogle}
                  onFailure={failureResponseGoogle}
                  cookiePolicy={"single_host_origin"}
                  icon={false}
                  padding={100}
                />
              </Box>
            }
          ></CardHeader>
        </Card>
      </Grid>
    </>
  );
};

export default Login;
