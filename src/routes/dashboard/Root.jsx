import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import Leftsidebar from "./Leftsidebar";
import Rightsidebar from "./Rightsidebar";

const DashboardRoot = () => {
  return (
    <div className="flex bg-slate-100 min-h-[calc(100vh-100px)] p-6 gap-10">
      <Leftsidebar />
      <div className=" flex-1">
        <Outlet />
      </div>
      <Rightsidebar />
    </div>
  );
};

export default DashboardRoot;
