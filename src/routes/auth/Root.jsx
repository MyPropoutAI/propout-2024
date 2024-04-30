import { Outlet } from "react-router-dom";
//import Header from "../../components/Header";
//import Footer from "../../components/Footer";
import { Toaster } from "../../components/ui/sonner";
import { Menu } from "../../components/Menu";
// import LandingPageNav from "../../components/LandingPageNav";
const AuthRoot = () => {
  return (
    <div>
      {/* <LandingPageNav /> */}
      <div className="min-h-[60vh]">
        <Outlet />
      </div>
      <div className="fixed top-[40%] -translate-y-1/2 right-4">
        <Menu />
      </div>
      <Toaster />
      {/* <Footer /> */}
    </div>
  );
};

export default AuthRoot;
