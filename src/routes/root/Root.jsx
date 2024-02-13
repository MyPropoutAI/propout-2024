import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Toaster } from "../../components/ui/toaster";

const Root = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Toaster />
      <Footer />
    </div>
  );
};

export default Root;
