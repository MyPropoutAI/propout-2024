import { Link, Outlet } from "react-router-dom";
import Settingdiv from "../../components/Settingdiv";

const Setting = () => {
  return (
    <div className="w-full bg-white">
      <Settingdiv />
      <div className="bg-white mt-3 rounded-md px-3 py-5 pb-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Setting;
