import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import Game from "./components/Game";
import Homerun from "./components/Homerun";
import Stadium from "./components/Stadium";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <h1 className="header">
          Watched Game Record
          <Link to="/" style={{ marginLeft: "15px" }}>
            <button className="link-button">Home</button>
          </Link>
          <Link to="/game" style={{ marginLeft: "15px" }}>
            <button className="link-button">Game</button>
          </Link>
          <Link to="/homerun" style={{ marginLeft: "15px" }}>
            <button className="link-button">Homerun</button>
          </Link>
          <Link to="/stadium" style={{ marginLeft: "15px" }}>
            <button className="link-button">Stadium</button>
          </Link>
        </h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/homerun" element={<Homerun />} />
          <Route path="/stadium" element={<Stadium />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
