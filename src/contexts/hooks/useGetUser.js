import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import jwt from "jsonwebtoken";

// Fetch user function
const fetchUser = async (userId) => {
  const response = await axios.get(
    `https://proput-db-jlb1.onrender.com/user/${userId}`
  );
  console.log(response.data);
  return response.data;
};

// Custom hook to get user data
export const useGetUser = () => {
  // Get the JWT token from Redux
  const userToken = useSelector((state) => state.auth.user);

  // Decode the token to get user ID
  const decodedUser = jwt.decode(userToken);

  // Use React Query to fetch and cache user data
  return useQuery({
    // Use the token as a query key to enable/disable the query
    queryKey: ["user", decodedUser?.id],

    // Only run the query if we have a token
    queryFn: () => fetchUser(decodedUser?.id),

    // Only enable the query if we have a token
    enabled: !!userToken,

    // Optional: Configure retry and caching
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
  });
};
