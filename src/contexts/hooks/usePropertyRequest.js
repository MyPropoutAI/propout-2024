import { useState } from "react";
import { toast } from "sonner";

export const usePropertyRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendPropertyRequest = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://proput-db-4vtf.onrender.com/send-property-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: "mypropoutai@gmail.com",
            subject: "New Property Request",
            formData: {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              propertyType: formData.propertyType,
              location: formData.location,
              budget: formData.budget,
              message: formData.message,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send property request");
      }

      const data = await response.json();
      toast.success("Property request sent successfully!");
      return data;
    } catch (err) {
      setError(err.message);
      toast.error("Failed to send property request", {
        description: err.message,
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendPropertyRequest,
    isLoading,
    error,
  };
};
