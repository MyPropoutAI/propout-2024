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
        `https://proput-db-jlb1.onrender.com/check-code`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: id,
            code: otp,
          }),
        }
      );

      // Check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Response is not JSON");
      }

      const json = await response.json();
      console.log(json);

      if (!json.success) {
        setLoading(false);
        console.log(json.error);
        return json;
      }

      if (json.success) {
        setLoading(false);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      return { success: false, error: error.message };
    }
  };

  return { otp, loading };
};
