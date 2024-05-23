//import { useAuthContext } from "./useAuthcontext";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
//import { login } from "../../redux/userSlice";
export const useLogout = () => {
  //const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return { userLogout };
};
