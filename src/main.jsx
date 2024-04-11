import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./lib/Router";

import { Context } from "./lib/Context";

import { ThirdwebProvider } from "thirdweb/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThirdwebProvider>
      {/* <Context> */}
      <RouterProvider router={router} />
      {/* </Context> */}
    </ThirdwebProvider>
  </React.StrictMode>
);

//     <Web3Provider>     </Web3Provider>
