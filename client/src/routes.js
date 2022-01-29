import Home from "./Dashboard/Home";
import Profile from "./Dashboard/Profile/Profile";
import { Navigate } from "react-router-dom";

const setProps = (props) => {
  return [
    {
      path: "/",
      children: [
        { path: "/", element: <Navigate to="/home" replace /> },
        { path: "/home", element: <Home {...props} /> },
        { path: "/profile", element: <Profile {...props} /> },
        { path: "*", element: <Navigate to="/home" replace /> },
      ],
    },
  ];
};

export default setProps;
