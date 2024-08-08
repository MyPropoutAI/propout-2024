import { Outlet } from "react-router-dom";
import Leftsidebar from "./Leftsidebar";
import Rightsidebar from "./Rightsidebar";
import AuthHeader from "../../components/AuthHeader";
import { Toaster } from "../../components/ui/sonner";

const DashboardRoot = () => {
  return (
    <div>
      <AuthHeader />

      <div className="flex bg-slate-100 min-h-[calc(100vh-100px)] p-6 gap-10">
        <div className="hidden  md:block">
          <Leftsidebar />
        </div>
        <div className="flex-1 ">
          <Outlet />
        </div>
        <div className="hidden lg:block ">
          <Rightsidebar />
        </div>

        <Toaster />
      </div>
    </div>
  );
};

export default DashboardRoot;
