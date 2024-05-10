import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./lib/Router";

import { ThirdwebProvider } from "thirdweb/react";
import { Toaster } from "./components/ui/sonner";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThirdwebProvider>
      <RouterProvider router={router} />
      <Toaster />
    </ThirdwebProvider>
  </React.StrictMode>
);
