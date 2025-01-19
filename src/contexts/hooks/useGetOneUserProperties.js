import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// API function to fetch property details
const fetchPropertyDetails = async (userId) => {
  const { data } = await axios.get(
    `https://proput-db-4vtf.onrender.com/user_uploads`,
    {
      params: {
        userId: userId,
      },
      headers: {
        "Content-Type": "application/json",
        userId: userId,
        // Add any additional headers if needed
      },
    }
  );
  //console.log(data);
  return data;
};

// Custom hook for property details
export const usePropertyDetails = (userId) => {
  return useQuery({
    queryKey: ["propertyDetails", userId],
    queryFn: () => fetchPropertyDetails(userId),
    // Additional configuration
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    onError: (error) => {
      console.error("Error fetching property details:", error);
      // Optional: Add error handling (e.g., toast notification)
    },
    // Transform or filter data if needed
    select: (data) => {
      // Optional: Transform data before returning
      // console.log(data);
      return data;
    },
  });
};
