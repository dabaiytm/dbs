import LoginPage from "./LoginPage"; // Adjust the import path as needed
import MainPage from "./MainPage"; // Ensure MainPage is imported correctly
import Members from "./components/Members";
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/members" element={<Members />} />
    </Routes>
  );
};

export default App;
