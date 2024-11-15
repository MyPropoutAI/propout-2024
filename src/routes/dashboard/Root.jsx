import { Outlet } from "react-router-dom";
import Leftsidebar from "./Leftsidebar";
import Rightsidebar from "./Rightsidebar";
import AuthHeader from "../../components/AuthHeader";
import { Toaster } from "../../components/ui/sonner";
import { useSelector } from "react-redux";
import { useUsers } from "../../contexts/hooks/useGetAllUsers";
import jwt from "jsonwebtoken";
import InfoBar from "../../components/InforBar";
const DashboardRoot = () => {
  const user = useSelector((state) => state.auth.user);
  const decodedUser = jwt.decode(user);

  const { data: users } = useUsers();
  console.log(users);
  const usersData = users ? users.user : [];

  const userData = Array.isArray(usersData)
    ? usersData.filter((user) => user.id === decodedUser.id)
    : [];
  return (
    <div>
      {userData?.status ? <></> : <InfoBar />}
      <AuthHeader />

      <div className="flex bg-slate-100 min-h-[calc(100vh-100px)] p-6 gap-10">
        <div className="hidden  md:block">
          <Leftsidebar />
        </div>
        <div className="flex-1 flex flex-col w-[90%] lg:w-full justify-center">
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
