import { createBrowserRouter } from "react-router-dom";

import Root from "../routes/root/Root";
import NotFound from "../routes/errorElement/NotFound";
import Home from "../routes/home/Home";
import Testing from "../routes/testing/Testing";
import List from "../routes/List/List";
import Sell from "../routes/List/sell/Sell";
import Success from "../routes/list-success/Success";
import About from "../routes/about/About";
import Faucet from "../routes/testnet/faucet/faucet";
import Marketplace from "../routes/marketplace/Marketplace";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "list",
        element: <List />,
      },
      {
        path: "list/sell",
        element: <Sell />,
      },
      {
        path: "list/success",
        element: <Success />,
      },

      {
        path: "about",
        element: <About />,
      },

      {
        path: "/testnet/faucet",
        element: <Faucet />,
      },
      {
        path: "/marketplace",
        element: <Marketplace />,
      },
      { path: "/test", element: <Testing /> },
    ],
  },
]);
