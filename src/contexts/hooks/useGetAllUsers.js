import { useQuery } from "react-query";
import axios from "axios";

// API function to fetch users
const fetchUsers = async () => {
  const { data } = await axios.get(
    "https://proput-db-jlb1.onrender.com/all_users",
    {
      // Optional: Add headers if needed
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': `Bearer ${token}` // If you need authentication
      },
    }
  );
  console.log("user data", data);
  return data;
};

// Custom hook for users
export const useUsers = () => {
  return useQuery("users", fetchUsers, {
    // Additional configuration
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    onError: (error) => {
      console.error("Error fetching users:", error);
      // Optional: Add error handling (e.g., toast notification)
    },
    // Transform or filter data if needed
    select: (data) => {
      // Optional: Transform data before returning
      console.log(data);
      return data;
    },
  });
};
