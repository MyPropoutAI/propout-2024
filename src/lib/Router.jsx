import { createBrowserRouter, createHashRouter } from "react-router-dom";

//  import About from "../routes/about/About";
// import Faucet from "../routes/testnet/faucet/faucet";
// import Marketplace from "../routes/marketplace/Marketplace";
import DashboardRoot from "../routes/dashboard/Root";
// import ListProperty from "../routes/dashboard/ListProperty";
// import Overview from "../routes/dashboard/Overview";
// import Refer from "../routes/dashboard/Refer";
import Setting from "../routes/dashboard/Setting";
import Task from "../routes/dashboard/Task";
// import Stake from "../routes/testnet/stake/stake";
// import Swap from "../routes/testnet/swap/swap";
// import Myproperty from "../routes/dashboard/Myproperty";
// >>>>>>> 284ed83f55823efd1f01d3208e27a60bb89bd58e

import Refer from "../routes/dashboard/Refer";
import Myproperty from "../routes/dashboard/Myproperty";
import Overview from "../routes/dashboard/Overview";
import ListProperty from "../routes/dashboard/ListProperty";
import Marketplace from "../routes/marketplace/Marketplace";
import Swap from "../routes/testnet/swap/swap";
import Stake from "../routes/testnet/stake/stake";
import Faucet from "../routes/testnet/faucet/faucet";
import Root from "../routes/root/Root";
import NotFound from "../routes/errorElement/NotFound";
import Home from "../routes/home/Home";
import Testing from "../routes/testing/Testing";
import List from "../routes/List/List";
import Sell from "../routes/List/sell/Sell";
import Success from "../routes/list-success/Success";
// import PeerToPeer from "../routes/p2p/P2P";
import AboutUs from "../routes/about/AboutUs";

export const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      // { path: "/", element: <Home /> },
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
        path: "AboutUs",
        element: <AboutUs />,
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
            // path: "/dashboard",
            index: true,
            element: <Overview />,
          },
          {
            path: "/dashboard/list",
            element: <ListProperty />,
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

// import About from "../routes/about/About";
// import Faucet from "../routes/testnet/faucet/faucet";
// import Marketplace from "../routes/marketplace/Marketplace";
// import DashboardRoot from "../routes/dashboard/Root";
// import ListProperty from "../routes/dashboard/ListProperty";
// import Overview from "../routes/dashboard/Overview";
// import Refer from "../routes/dashboard/Refer";
// import Setting from "../routes/dashboard/Setting";
// import Task from "../routes/dashboard/Task";
// import Stake from "../routes/testnet/stake/stake";
// import Swap from "../routes/testnet/swap/swap";
// import Myproperty from "../routes/dashboard/Myproperty";
// >>>>>>> 284ed83f55823efd1f01d3208e27a60bb89bd58e
