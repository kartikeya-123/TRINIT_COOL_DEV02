import Home from "./Dashboard/Home";
import Profile from "./Dashboard/Profile";
import Modal from "./Dashboard/Modal/Modal";
import { Navigate } from "react-router-dom";
import Team from "./Dashboard/Teams";

const setProps = (props) => {
  return [
    {
      path: "/",
      children: [
        { path: "/", element: <Navigate to="/home" replace /> },
        { path: "/home", element: <Home {...props} /> },
        { path: "/team/:id", element: <Team {...props} /> },
        { path: "/profile", element: <Profile {...props} /> },
        { path: "/modal", element: <Modal /> },
        { path: "*", element: <Navigate to="/home" replace /> },
      ],
    },
  ];
};

export default setProps;
