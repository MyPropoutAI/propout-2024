import { createBrowserRouter, createHashRouter } from "react-router-dom";
import DashboardRoot from "../routes/dashboard/Root";
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
import AboutUs from "../routes/about/AboutUs";
import LoginPage from "../routes/auth/login/Login";
import Register from "../routes/auth/register/Register";
import ForgetPassword from "../routes/auth/forgetPassword/ForgetPassword";
import NewPassword from "../routes/auth/newPassword/NewPassword";
import Index from "../routes/page/Index";
import PageRoot from "../routes/page/Root";
import Blog from "../routes/blog/Blog";
import RoadMap from "../routes/road-map/RoadMap";
import Guide from "../routes/guide/Guide";
import AuthRoot from "../routes/auth/Root";

import Accountsetting from "../components/Accountsetting";
import Notification from "../components/Notification";
import Helpsetting from "../components/Helpsetting";
import Profilesetting from "../components/Profilesetting";

import Propertydesc from "../routes/descripyion/Propertydesc";
import Agent from "../routes/Agent/Agent";
import Verification from "../routes/dashboard/Verification";

// export const router = createHashRouter([
// import Login from "../routes/onboarding/Login";
// import Signup from "../routes/onboarding/Signup";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PageRoot />,
    errorElement: <NotFound />,
    children: [
      // { index: true, element: <Home /> },
      { path: "/", element: <Index /> },
      { path: "blog", element: <Blog /> },
      { path: "/road-map", element: <RoadMap /> },
      { path: "/guide", element: <Guide /> },
      // {
      //   path: "/property-description",
      //   element: <Propertydesc />,
      // },
    ],
  },

  {
    path: "/home",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      // { index: true, element: <Home /> },
      // { path: "/", element: <Index /> },
      { path: "/home", element: <Home /> },
      {
        path: "/home/list",
        element: <List />,
      },
      {
        path: "/home/list/sell",
        element: <Sell />,
      },
      {
        path: "/home/list/success",
        element: <Success />,
      },

      {
        path: "/home/AboutUs",
        element: <AboutUs />,
      },

      {
        path: "/home/testnet/faucet",
        element: <Faucet />,
      },
      {
        path: "/home/testnet/swap",
        element: <Swap />,
      },
      {
        path: "/home/testnet/stake",
        element: <Stake />,
      },
      {
        path: "/home/marketplace",
        element: <Marketplace />,
      },
      { path: "/home/test", element: <Testing /> },
      {
        path: "/home/property-description/:id",
        element: <Propertydesc />,
      },
      {
        path: "/home/agent",
        element: <Agent />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardRoot />,
    children: [
      {
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
        path: "/dashboard/verification",
        element: <Verification />,
      },
      {
        path: "/dashboard/setting",
        element: <Setting />,
        children: [
          {
            path: "/dashboard/setting/profile",
            element: <Profilesetting />,
          },
          {
            path: "/dashboard/setting/notification",
            element: <Notification />,
          },
          {
            path: "/dashboard/setting/help",
            element: <Helpsetting />,
          },
          {
            path: "/dashboard/setting/account",
            element: <Accountsetting />,
          },
        ],
      },
      {
        path: "/dashboard/task",
        element: <Task />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthRoot />,
    children: [
      {
        index: true,
        element: <Overview />,
      },

      {
        path: "/auth/login",
        element: <LoginPage />,
      },
      {
        path: "/auth/forgetPassword",
        element: <ForgetPassword />,
      },
      {
        path: "/auth/createPassword",
        element: <NewPassword />,
      },
      {
        path: "/auth/register",
        element: <Register />,
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
