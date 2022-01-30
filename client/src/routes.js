import Home from "./Dashboard/Home";
import Team from "./Dashboard/Teams";
import Profile from "./Dashboard/Profile";
import Dashboard from "./Dashboard/Dashboard";
import Organisation from "./Dashboard/Organisation";
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
        { path: "*", element: <Navigate to="/home" replace /> },
      ],
    },
  ];
};

export default setProps;
