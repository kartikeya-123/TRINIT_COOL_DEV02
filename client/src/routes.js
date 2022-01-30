import Home from "./Dashboard/Home";
import Team from "./Dashboard/Team";
import Profile from "./Dashboard/Profile";
import Dashboard from "./Dashboard/Dashboard";
import Organisation from "./Dashboard/Organisation";
import Bug from "./Dashboard/Bug";
import { Navigate } from "react-router-dom";

const setProps = (props) => {
  return [
    {
      path: "/",
      children: [
        { path: "/", element: <Navigate to="/home" replace /> },
        { path: "/home", element: <Home {...props} /> },
        { path: "/team/:id", element: <Team {...props} /> },
        { path: "/profile", element: <Profile {...props} /> },
        { path: "/dashboard", element: <Dashboard {...props} /> },
        { path: "/org/:id", element: <Organisation {...props} /> },
        { path: "/bug/:id", element: <Bug {...props} /> },
        { path: "*", element: <Navigate to="/home" replace /> },
      ],
    },
  ];
};

export default setProps;
