import { useState } from "react";
import { toast } from "sonner";

export const useUpdateProperty = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdateProperty = async ({ propertyData, propertyId, userId }) => {
    setIsLoading(true);
    setError(null);
    console.log("object update property", propertyData);

    try {
      const response = await fetch(
        `https://proput-db-4vtf.onrender.com/edit-listing`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            userId: userId,
            propertyId: propertyId,
          },
          body: JSON.stringify(propertyData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update property");
      }

      const data = await response.json();
      toast.success("Property updated successfully!");
      return data;
    } catch (err) {
      setError(err.message);
      toast.error("Failed to update property", {
        description: err.message,
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleUpdateProperty,
    isLoading,
    error,
  };
};
