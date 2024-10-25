import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MainPage: React.FC = () => {
  const [data, setData] = useState(null); // State to hold fetched data
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token"); // Get the token from local storage

      if (!token) {
        navigate("/"); // Redirect to login if no token is found
        return;
      }

      try {
        const response = await fetch("http://localhost:5001/api/protected-route", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // Include the token in the request
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setData(result); // Store the fetched data in state
      } catch (error) {
        console.error("Error fetching data:", error);
        // Optionally handle error (e.g., redirect to login if token is invalid)
        navigate("/");
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    navigate("/"); // Redirect to the login page
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
      <main>
        {data ? <p>{JSON.stringify(data)}</p> : <p>Loading...</p>}
      </main>
    </div>
  );
};

export default MainPage;
