import LoginPage from "./LoginPage"; // Adjust the import path as needed
import MainPage from "./MainPage";
import Members from "./components/Members";
import Staffs from "./components/Staffs";
import Equipment from "./components/Equipment";
import Footer from "./components/Footer";
import Classes from "./components/Classes";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/members" element={<Members />} />
        <Route path="/staffs" element={<Staffs />} />
        <Route path="/equipment" element={<Equipment />} />
        <Route path="/classes" element={<Classes />} />
      </Routes>
      <Footer /> {/* Footer will be displayed on all pages */}
    </div>
  );
};

export default App;
