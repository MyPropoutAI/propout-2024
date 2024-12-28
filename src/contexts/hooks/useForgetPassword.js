import { useState } from "react";

const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const forgotPassword = async (email) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        "https://proput-db-jlb1.onrender.com/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send reset password email");
      }

      const data = await response.json();
      setSuccess(data.message || "Reset password email sent successfully");
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { forgotPassword, loading, error, success };
};

export default useForgotPassword;
