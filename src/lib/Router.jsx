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
import DashboardRoot from "../routes/dashboard/Root";
import ListProperty from "../routes/dashboard/ListProperty";
import Overview from "../routes/dashboard/Overview";
import Refer from "../routes/dashboard/Refer";
import Setting from "../routes/dashboard/Setting";
import Task from "../routes/dashboard/Task";
import Stake from "../routes/testnet/stake/stake";
import Swap from "../routes/testnet/swap/swap";
import Myproperty from "../routes/dashboard/Myproperty";

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
        path: "/testnet/swap",
        element: <Swap />,
      },
      {
        path: "/testnet/stake",
        element: <Stake />,
      },
      {
        path: "/marketplace",
        element: <Marketplace />,
      },
      { path: "/test", element: <Testing /> },
      {
        path: "/dashboard",
        element: <DashboardRoot />,
        children: [
          {
            path: "/dashboard/list",
            element: <ListProperty />,
          },
          {
            path: "/dashboard/overview",
            element: <Overview />,
          },
          {
            path: "/dashboard/properties",
            element: <Myproperty />,
          },
          {
            path: "/dashboard/referral",
            element: <Refer />,
          },
          {
            path: "/dashboard/setting",
            element: <Setting />,
          },
          {
            path: "/dashboard/task",
            element: <Task />,
          },
        ],
      },
    ],
  },
]);
