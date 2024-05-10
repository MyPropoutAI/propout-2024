import { useState } from "react";
import { useAuthContext } from "./useAuthcontext";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const signup = async (data) => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(`https://proput-db.onrender.com/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email_address: data.email,
          password: data.password,
          phone_number: data.phone_number,
        }),
      });
      const json = await response.json();
      console.log(json);
      if (!json.success) {
        setError(json.error);
        setLoading(false);
        console.log(error);
      }
      if (json.success) {
        console.log(json);
        localStorage.setItem("user", JSON.stringify(json));
        dispatch({ type: "LOGIN", payload: json });
        setLoading(false);
        navigate("/home");
      }
    } catch (error) {
      setError(error);
    }
  };

  return { signup, error, loading };
};