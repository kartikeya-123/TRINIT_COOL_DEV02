import "./App.css";
import Wrapper from "./Wrapper";
import { BrowserRouter } from "react-router-dom";
import Home from "./Dashboard/Home";
import NavBar from "./Dashboard/NavBar/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Home />
      <BrowserRouter>
        <Wrapper />
      </BrowserRouter>
    </div>
  );
}

export default App;
