import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
//import jwt from "jsonwebtoken";
const Protected = () => {
  const user = useSelector((state) => state.auth.user);
  //const token = localStorage.getItem("persist:root");

  return <>{user ? <Outlet /> : <Navigate to="/" />}</>;
};

export default Protected;
