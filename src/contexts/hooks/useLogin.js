import { useState } from "react";
import { useAuthContext } from "./useAuthcontext";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (data) => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(`https://proput-db.onrender.com/log-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email_address: data.email,
          password: data.password,
        }),
      });
      const json = await response.json();
      if (!json.success) {
        setError(json.error);
        setLoading(false);
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

  return { login, error, loading };
};
