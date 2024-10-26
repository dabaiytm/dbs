import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import "./index.css"; // Import global styles
import App from "./App"; // Import App component

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      {" "}
      {/* Wrap App in BrowserRouter for routing */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
