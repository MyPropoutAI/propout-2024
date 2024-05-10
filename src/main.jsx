import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./lib/Router";

import { ThirdwebProvider } from "thirdweb/react";
import { AuthProvider } from "./contexts/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ThirdwebProvider>
        <RouterProvider router={router} />
      </ThirdwebProvider>
    </AuthProvider>
  </React.StrictMode>
);
