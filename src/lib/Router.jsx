import { createBrowserRouter } from "react-router-dom";

import Root from "../routes/root/Root";
import NotFound from "../routes/errorElement/NotFound";
import Home from "../routes/home/Home";
// import Header from "../components/Header";
// import Footer from "../components/Footer";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [{ path: "/", element: <Home /> }],
  },
]);
