import React from "react";
import { useNavigate } from "react-router-dom";

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logic to log out (e.g., clear tokens, redirect)
    navigate("/");
  };

  const handleExit = () => {
    const confirmExit = window.confirm("Are you sure you want to exit?");
    if (confirmExit) {
      window.close(); // This will close the window if it's allowed
    }
  };

  return (
    <div>
      <header>
        <h1>Welcome to the Main Page</h1>
        <nav>
          <button onClick={() => navigate("/members")}>Members</button>
          <button onClick={() => navigate("/staffs")}>Staffs</button>
          <button onClick={() => navigate("/equipment")}>Equipment</button>
          <button onClick={() => navigate("/classes")}>Classes</button>
          <button onClick={() => navigate("/retail-sales")}>
            Retail Sales
          </button>
          <button onClick={() => navigate("/trainers")}>Trainers</button>
          <button onClick={handleLogout}>Log Out</button>
          <button onClick={handleExit}>Exit</button>
        </nav>
      </header>
      <main>{/* Content for the main page goes here */}</main>
    </div>
  );
};

export default MainPage;
