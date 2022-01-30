import { Container } from "@mui/material";
import { useRoutes } from "react-router-dom";
import setProps from "../routes";
import NavBar from "./NavBar";

const DashboardLayout = ({ user, assigned, resolved }) => {
  const routing = useRoutes(setProps({ user, assigned, resolved }));

  return (
    <div>
      <NavBar user={user} />
      <Container style={{ textAlign: "center" }}>{routing}</Container>
    </div>
  );
};

export default DashboardLayout;
