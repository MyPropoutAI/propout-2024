import { createBrowserRouter } from "react-router-dom";

import Root from "../routes/root/Root";
import NotFound from "../routes/errorElement/NotFound";
import Home from "../routes/home/Home";
import Testing from "../routes/testing/Testing";
import List from "../routes/List/List";
import Sell from "../routes/List/sell/Sell";
import Success from "../routes/list-success/Success";
import PeerToPeer from "../routes/p2p/P2P";
import About from "../routes/about/About";

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
        path: "p2p",
        element: <PeerToPeer />,
      },
      {
        path: "about",
        element: <About />,
      },
      { path: "/test", element: <Testing /> },
    ],
  },
]);
