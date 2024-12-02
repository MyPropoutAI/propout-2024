import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { Menu } from "../../components/Menu";
import { useSelector } from "react-redux";
import { useUsers } from "../../contexts/hooks/useGetAllUsers";
import jwt from "jsonwebtoken";
import InfoBar from "../../components/InforBar";
const Root = () => {
  const user = useSelector((state) => state.auth.user);
  const decodedUser = jwt.decode(user);

  const { data: users } = useUsers();
  //console.log(users);
  const usersData = users ? users.user : [];

  const userData = Array.isArray(usersData)
    ? usersData.filter((user) => user.id === decodedUser.id)
    : [];
  return (
    <div>
      {userData?.status == false ? <InfoBar /> : <></>}
      <Header />
      <div className="min-h-[60vh]">
        <Outlet />
      </div>
      <div className="fixed top-[40%] -translate-y-1/2 right-4">
        <Menu />
      </div>

      <Footer />
    </div>
  );
};

export default Root;
