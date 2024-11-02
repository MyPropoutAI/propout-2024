import { useState } from "react";
//import { useAuthContext } from "./useAuthcontext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";
import jwt from "jsonwebtoken";

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [user, setUser] = useState(null);
  // const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const signup = async (data) => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(
        `https://proput-db-g4t.onrender.com/sign-up`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data.name,
            email_address: data.email,
            password: data.password,
            phone_number: data.phone_number,
          }),
        }
      );
      const json = await response.json();
      console.log(json);
      if (!json.success) {
        setError(json.error.message);
        setLoading(false);
        console.log(error);
        return json;
      }
      if (json.success) {
        // console.log(json);
        //localStorage.setItem("propoutUser", JSON.stringify(json.success.token));
        //dispatch({ type: "LOGIN", payload: json });
        dispatch(login(json.success.token));
        setLoading(false);
        setSuccess(json.success.success);
        setUser(json.success.token);
        const decodedUser = jwt.decode(json.success.token);
        console.log(decodedUser);
        setUser(decodedUser);
        navigate("/auth/otp");
      }
    } catch (error) {
      setError(error);
    }
  };

  return { signup, error, loading, success, user };
};
