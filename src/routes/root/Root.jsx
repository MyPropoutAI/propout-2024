import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Toaster } from "../../components/ui/toaster";
import { Menu } from "../../components/Menu";

const Root = () => {
  return (
    <div>
      <Header />
      <div className="min-h-[60vh]">
        <Outlet />
      </div>
      <div className="fixed top-[40%] -translate-y-1/2 right-4">
        <Menu />
      </div>
      <Toaster />
      <Footer />
    </div>
  );
};

export default Root;
