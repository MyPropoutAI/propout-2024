import { Outlet } from "react-router-dom";
import Eclipse from "../../components/Eclipse";
import AuthHeader from "../../components/AuthHeader";
import Footer from "../../components/Footer";
import { useSelector } from "react-redux";
import { useUsers } from "../../contexts/hooks/useGetAllUsers";
import jwt from "jsonwebtoken";
import InfoBar from "../../components/InforBar";

const TestnetRoot = () => {
  const user = useSelector((state) => state.auth.user);
  const decodedUser = jwt.decode(user);

  const { data: users } = useUsers();
  console.log(users);
  const usersData = users ? users.user : [];

  const userData = Array.isArray(usersData)
    ? usersData.filter((user) => user.id === decodedUser.id)
    : [];
  return (
    <>
      {userData?.status ? <></> : <InfoBar />}
      <AuthHeader bg="bg-[#2A0144]" />
      <div className="flex justify-center py-6 md:py-20 bg-[#220136] relative isolate">
        <div className="bg-hero absolute inset-0 -z-10 bg-cover bg-center">
          <Eclipse />
        </div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default TestnetRoot;
