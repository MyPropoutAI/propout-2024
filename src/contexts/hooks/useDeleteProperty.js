import { useState } from "react";
import axios from "axios";

const deleteProperty = async (data) => {
  console.log(data.userId);
  try {
    const response = await axios.delete(
      `https://proput-db-jlb1.onrender.com/delete`,
      {
        headers: {
          "Content-Type": "application/json",
          userId: data.userId.userid,
          propertyId: data.userId.propertyId,
        },
      }
    );

    return response.data; // Return the data from the response
  } catch (error) {
    // Handle error
    throw new Error("Failed to delete property: " + error.message);
  }
};

// Example component using the deleteProperty function
export const UseDeleteProperty = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState("");

  const handleDeleteProperty = async (userId, propertyId) => {
    setLoading(true);
    setError(null); // Reset error state before the request
    const deleteData = { userId, propertyId };
    try {
      const result = await deleteProperty(deleteData);
      setIsSuccess(result.success); // Set success message if the property is deleted successfully
      console.log("Property deleted successfully:", result);
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    } finally {
      setLoading(false); // Set loading to false regardless of the outcome
    }
  };

  return { handleDeleteProperty, loading, error, isSuccess };
};
