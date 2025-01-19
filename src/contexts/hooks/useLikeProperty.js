import { useMutation } from "@tanstack/react-query";

const useLikeProperty = () => {
  const likeMutation = useMutation(async ({ userId, propertyId }) => {
    const response = await fetch(
      `https://proput-db-4vtf.onrender.com/property/${propertyId}/like`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to like property");
    }

    return await response.json();
  });

  return likeMutation;
};

export default useLikeProperty;
