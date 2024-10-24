import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage"; // Adjust the path as needed
import MainPage from "./MainPage"; // Adjust if you have a MainPage component

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/main" element={<MainPage />} />
    </Routes>
  );
};

export default App;
