import { useState } from "react";
// import { useAuthContext } from "./useAuthcontext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";
import { toast } from "sonner";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  //const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = async (data) => {
    //console.log(data);
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(
        `https://proput-db-jlb1.onrender.com/log-in`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email_address: data.email,
            password: data.password,
          }),
        }
      );
      const json = await response.json();
      //console.log(json);
      if (!json.success) {
        setError(json.error);
        setLoading(false);
        return json;
      }
      if (json.success) {
        dispatch(login(json.success.token));
        setLoading(false);
        navigate("/home");
        return json;
      }
    } catch (error) {
      setError(error);
    }
  };

  return { userLogin, error, loading };
};
