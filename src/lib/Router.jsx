import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../middleware/ProtectedRout";
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
import Swap from "../routes/dashboard/swap";
import Stake from "../routes/dashboard/stake";
//import Faucet from "../routes/testnet/faucet/faucet";
import Root from "../routes/root/Root";
import NotFound from "../routes/errorElement/NotFound";
import Home from "../routes/home/Home";
// import Testing from "../routes/testing/Testing";
import Testing from "../routes/page/testing/Testing";
import List from "../routes/List/List";
import Sell from "../routes/List/sell/Sell";
import Success from "../routes/list-success/Success";
// import AboutUs from "../routes/about/AboutUs";
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
import About from "../routes/page/About";
//import KycRoot from "../routes/kyc/Root";

import TestnetRoot from "../routes/testnet/root";
import Otp from "../routes/auth/otp/Otp";
import MintNft from "../routes/dashboard/MintNft";

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
      //   path: "/testnet",
      //   element: <TestnetRoot />,
      //   children: [{ path: "stake", element: <Stake /> }],
      // },
      // {
      //   path: "/property-description",
      //   element: <Propertydesc />,
      // },
    ],
  },
  {
    path: "/testnet",
    element: (
      <ProtectedRoute>
        <TestnetRoot />
      </ProtectedRoute>
    ),
    children: [{ path: "stake", element: <Stake /> }],
  },

  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Root />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
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
        path: "/home/about",
        element: <About />,
      },
      // {
      //   path: "/home/testnet/faucet",
      //   element: <Faucet />,
      // },

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
    element: (
      <ProtectedRoute>
        <DashboardRoot />
      </ProtectedRoute>
    ),
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
        path: "/dashboard/swap",
        element: <Swap />,
      },
      {
        path: "/dashboard/stake",
        element: <Stake />,
      },
      {
        path: "/dashboard/mint-nft",
        element: <MintNft />,
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
      {
        path: "/auth/otp",
        element: <Otp />,
      },
    ],
  },
  // {
  //   path: "/kyc",
  //   element: <KycRoot />,
  //   children: [
  //     {
  //       index: true,
  //       element: <Overview />,
  //     },
  //   ],
  // },
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
