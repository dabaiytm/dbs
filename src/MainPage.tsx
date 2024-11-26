import React from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <header>
        <nav className="navbar">
          <button onClick={() => navigate("/members")}>Members</button>
          <button onClick={() => navigate("/staffs")}>Staffs</button>
          <button onClick={() => navigate("/equipment")}>Equipment</button>
          <button onClick={() => navigate("/classes")}>Classes</button>
          <button onClick={() => navigate("/retailsales")}>Retail Sales</button>
          <button onClick={() => navigate("/trainers")}>Trainers</button>
          <button onClick={() => navigate("/feedback")}>Feedback</button>
          <button onClick={() => navigate("/")}>Log Out</button>
        </nav>
      </header>

      <div id="bgi"></div>
      <p id="greeting">Welcome To The Gym Database !</p>
    </div>
  );
};

export default MainPage;
