import { useRoutes, Outlet } from "react-router-dom";
import setProps from "../routes";
import NavBar from "./NavBar/NavBar";

const DashboardLayout = ({ user }) => {
  const routing = useRoutes(setProps({ user }));

  return (
    <div>
      <NavBar user={user} />
      {routing}
    </div>
  );
};

export default DashboardLayout;
