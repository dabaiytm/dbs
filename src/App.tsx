<<<<<<< Updated upstream
import React from "react";
=======
import LoginPage from "./LoginPage"; // Adjust the import path as needed
import MainPage from "./MainPage"; // Ensure MainPage is imported correctly
import Members from "./components/Members";
import Staffs from "./components/Staffs";
import Equipment from "./components/Equipment";
import Classes from "./components/Classes"; 
import Retailsales from "./components/Retailsales";
import Trainers from "./components/Trainers";

>>>>>>> Stashed changes
import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage"; 
import MainPage from "./MainPage"; 

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/main" element={<MainPage />} />
<<<<<<< Updated upstream
=======
      <Route path="/members" element={<Members />} />
      <Route path="/staffs" element={<Staffs />} />
      <Route path="/equipment" element={<Equipment />} />
      <Route path="/classes" element={<Classes />} />
      <Route path="/retailsales" element={<Retailsales />} />
      <Route path="/trainers" element={<Trainers />} />
>>>>>>> Stashed changes
    </Routes>
  );
};

export default App;
