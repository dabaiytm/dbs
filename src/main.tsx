import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LoginPage from "./LoginPage"; // Import the login page component

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoginPage /> {/* Render the login page */}
  </StrictMode>
);
