import React from "react";
import ReactDOM from "react-dom/client"; // Use 'react-dom' in React 18+
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import App from "./App"; // Assuming your main App component is in App.tsx

const root = ReactDOM.createRoot(document.getElementById("root")!); // Ensure there's an element with id 'root' in your HTML
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
