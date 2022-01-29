import { Container } from "@mui/material";
import { useRoutes } from "react-router-dom";
import setProps from "../routes";
import NavBar from "./NavBar";

const DashboardLayout = ({ user }) => {
  const routing = useRoutes(setProps({ user }));

  return (
    <div>
      <NavBar user={user} />
      <Container style={{ textAlign: "center" }}>{routing}</Container>
    </div>
  );
};

export default DashboardLayout;
