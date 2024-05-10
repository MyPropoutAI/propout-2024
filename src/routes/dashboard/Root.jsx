import { Outlet } from "react-router-dom";
import Leftsidebar from "./Leftsidebar";
import Rightsidebar from "./Rightsidebar";
import AuthHeader from "../../components/AuthHeader";

const DashboardRoot = () => {
  return (
    <div>
      <AuthHeader />

      <div className="flex bg-slate-100 min-h-[calc(100vh-100px)] p-6 gap-10">
        <div className="hidden  md:block">
          <Leftsidebar />
        </div>
        <div className=" lg:flex-1 max-w-[20rem] md:max-w-[38rem] lg:max-w-[75rem]">
          <Outlet />
        </div>
        <div className="hidden lg:block ">
          <Rightsidebar />
        </div>
      </div>
    </div>
  );
};

export default DashboardRoot;
