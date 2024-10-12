import { useState } from "react";
//import { useAuthContext } from "./useAuthcontext";
import { useNavigate } from "react-router-dom";
//import { useDispatch } from "react-redux";
//import { login } from "../../redux/userSlice";

export const useOtp = () => {
  const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState(null);
  // const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const otp = async (id, otp) => {
    console.log("userId:", id, "userOtp:", otp);
    setLoading(true);
    try {
      const response = await fetch(
        `https://proput-db.onrender.com/check-code`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: id,
            otp: otp,
          }),
        }
      );
      const json = await response.json();
      console.log(json);
      if (!json.success) {
        // setError(json.error);
        setLoading(false);
        console.log(json.error);
        return json;
      }
      if (json.success) {
        //dispatch(login(json.success.token));
        setLoading(false);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      //   setError(error);
    }
  };

  return { otp, loading };
};
