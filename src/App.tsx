import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage"; // Adjust the path as needed
import MainPage from "./MainPage"; // Adjust if you have a MainPage component
import Members from "./components/Members"; // Updated path
import MemberDetail from "./components/MembersDetails"; // Updated path

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/members" element={<Members />} />
      <Route path="/members/:memId" element={<MemberDetail />} />
      {/* Add other routes as needed */}
    </Routes>
  );
};

export default App;
