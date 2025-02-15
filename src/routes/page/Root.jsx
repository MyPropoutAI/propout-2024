import { Outlet } from "react-router-dom";
//import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Toaster } from "../../components/ui/sonner";
import { Menu } from "../../components/Menu";
import LandingPageNav from "../../components/LandingPageNav";
import { PropertyRequestForm } from "../../components/RequestProperty";
const PageRoot = () => {
  return (
    <div>
      <LandingPageNav />
      <div className="bg-white">
        <Outlet />
      </div>
      <div className="fixed bottom-[4rem]  -translate-y-1/2 right-4">
        <Menu />
      </div>
      <PropertyRequestForm />
      <Toaster />
      <Footer />
    </div>
  );
};

export default PageRoot;
