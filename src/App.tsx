import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage"; 
import MainPage from "./MainPage"; 

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/main" element={<MainPage />} />
    </Routes>
  );
};

export default App;
