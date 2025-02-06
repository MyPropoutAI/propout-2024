import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "https://proput-db-4vtf.onrender.com";

// Custom hook for sponsoring a property
export const useSponsorProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, propertyId }) => {
      const response = await axios.patch(
        `${BASE_URL}/property/sponsor`,
        {}, // empty body as per requirements
        {
          headers: {
            userId: userId,
            propertyId: propertyId,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      // Invalidate relevant queries to refetch the updated data
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
    onError: (error) => {
      console.error("Error sponsoring property:", error);
      throw error;
    },
  });
};

// Custom hook for unsponsoring a property
export const useUnsponsorProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, propertyId }) => {
      const response = await axios.post(
        `${BASE_URL}/property/sponsor`,
        {}, // empty body as per requirements
        {
          headers: {
            userId: userId,
            propertyId: propertyId,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      // Invalidate relevant queries to refetch the updated data
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
    onError: (error) => {
      console.error("Error unsponsoring property:", error);
      throw error;
    },
  });
};
