import { useState } from "react";
//import { useAuthContext } from "./useAuthcontext";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
import { useSelector } from "react-redux";
export const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const user = useSelector((state) => state.auth.user);
  const decodedUser = jwt.decode(user);

  // const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const updateProfile = async (data) => {
    console.log(data);
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(
        `https://proput-db-jlb1.onrender.com/update-profile`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data?.name,
            phone_number: data?.phone_number,
            address: data?.address,
            occupation: data?.occupation,
            email: data?.email,
            country: data?.country,
            description: data?.description,
            city: data?.city,
            facebook: data?.facebook,
            instagram: data?.instagram,
            twitter: data?.twitter,
            linkedIn: data?.linkedIn,
            website: data?.website,
            userId: data?.userId,
            profile_picture: data?.profilePicture,
          }),
        }
      );
      const json = await response.json();
      console.log(json);
      if (!json.success) {
        setError(json.error.message);
        setLoading(false);
        console.log(error);
        return json;
      }
      if (json.success) {
        setLoading(false);
        setSuccess(json.success.success);
        navigate(`/dashboard/agent-profile/${decodedUser.id}`);
      }
    } catch (error) {
      setError(error);
    }
  };

  return { updateProfile, error, loading, success };
};
