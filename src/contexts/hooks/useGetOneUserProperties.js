import { useQuery } from "react-query";
import axios from "axios";

// API function to fetch property details
const fetchPropertyDetails = async (propertyId) => {
  const { data } = await axios.get(
    `https://proput-db-jlb1.onrender.com/user_uploads`,
    {
      params: {
        userId: propertyId,
      },
      headers: {
        "Content-Type": "application/json",
        userId: propertyId,
        // Add any additional headers if needed
      },
    }
  );
  console.log(data);
  return data;
};

// Custom hook for property details
export const usePropertyDetails = (propertyId) => {
  //console.log(propertyId);
  return useQuery(
    ["property", propertyId],
    () => fetchPropertyDetails(propertyId),
    {
      // Refetch every 5 minutes
      refetchInterval: 5 * 60 * 1000,

      // Only run the query if propertyId is provided
      enabled: !!propertyId,

      // Error handling
      onError: (error) => {
        console.error("Error fetching property details:", error);
        // Optional: Add error handling (e.g., toast notification)
      },

      // Optional: Transform or filter data
      select: (data) => {
        // Example of data transformation
        //console.log(data);
        return {
          data,
        };
      },

      // Retry failed requests
      retry: 3,

      // Keep previous data while fetching
      keepPreviousData: true,
    }
  );
};
