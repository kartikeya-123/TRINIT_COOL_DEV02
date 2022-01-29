import "./App.css";
import Wrapper from "./Wrapper";
import { BrowserRouter } from "react-router-dom";
import Home from "./Dashboard/Home";
import NavBar from "./Dashboard/NavBar/NavBar";
import Profile from "./Dashboard/Profile/Profile";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Profile />
      <BrowserRouter>
        <Wrapper />
      </BrowserRouter>
    </div>
  );
}

export default App;
