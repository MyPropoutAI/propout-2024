//import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { useForm } from "react-hook-form";
import { UploadToCloudinary } from "../../components/UploadToCloudinary";
import { useVerify } from "../../contexts/hooks/useVerify";
import { useSelector, useDispatch } from "react-redux";
import jwt from "jsonwebtoken";
import { Rings } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { verified } from "../../redux/userSlice";
const Verification = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const user = useSelector((state) => state.auth.user);
  const isVerified = useSelector((state) => state.auth.isVerified);
  const navigate = useNavigate();
  const decodedUser = jwt.decode(user);
  const userId = decodedUser.id;
  //console.log(userId);

  const { verify, loading } = useVerify();
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    // console.log("Form data:", data);
    const image1 = data.pfp[0];
    const image2 = data.id_card[0];
    const image3 = data.profile_picture[0];
    //console.log(image1, image2, image3);
    try {
      const rawImage1 = await UploadToCloudinary(image1);
      const rawImage2 = await UploadToCloudinary(image2);
      const rawImage3 = await UploadToCloudinary(image3);
      if (!rawImage1 && rawImage2 && rawImage3) {
        console.log("upload image error");
      }
      console.log(rawImage1, rawImage2, rawImage3);
      const credentials = {
        ...data,
        pfp: rawImage1,
        id_card: rawImage2,
        proof_of_residence: rawImage3,
        id: userId,
      };
      await verify(credentials);
      dispatch(verified());
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
    // Handle form submission logic here (e.g., send data to server)
  };
  return (
    <div className="bg-white rounded-md flex justify-center items-center py-10">
      <div className="w-[80%] flex flex-col items-center ">
        <h1 className="text-center font-bold text-2xl my-2 text-[#320051]">
          Verify your credentials
        </h1>
        <p className="w-[60%] text-center mb-4">
          Please upload all the requires credential to enable you list
          properties
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-2"
        >
          <div>
            <label className="mb-1">Address</label>
            <Input
              {...register("address", { required: true })}
              type="text"
              placeholder="Address"
              className="w-full texl-lg"
            />
            {errors.address && (
              <span className="error text-red-500 text-md">
                {errors.address.message}
              </span>
            )}
          </div>
          <div>
            <label className="mb-1">Proof of address</label>
            <Input
              {...register("pfp", { required: true })}
              type="file"
              placeholder="Profile picture"
              className="w-full texl-lg"
            />
            {errors.pfp && (
              <span className="error text-red-500 text-md">
                {errors.pfp.message}
              </span>
            )}
          </div>
          <div>
            <label className="mb-1">ID CARD</label>
            <Input
              {...register("id_card", { required: true })}
              type="file"
              placeholder="ID cARD"
              className="w-full texl-lg"
            />
            {errors.id_card && (
              <span className="error text-red-500 text-md">
                {errors.id_card.message}
              </span>
            )}
          </div>
          <div>
            <label className="mb-1">Profile picture</label>
            <Input
              {...register("profile_picture", { required: true })}
              type="file"
              placeholder="Profile picture"
              className="w-full texl-lg"
            />
            {errors.profile_picture && (
              <span className="error text-red-500 text-md">
                {errors.profile_picture.message}
              </span>
            )}
          </div>
          <div>
            <Textarea
              {...register("bio", { required: true })}
              type="text"
              placeholder="Bio"
              className="w-full texl-lg min-h-40"
            />
            {errors.bio && (
              <span className="error text-red-500 text-md">
                {errors.bio.message}
              </span>
            )}
          </div>
          <Button className="text-white px-12 bg-[#964CC3]">
            {loading ? (
              <Rings
                visible={true}
                height="40"
                width="844fa94d"
                ariaLabel="rings-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              "Verify"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Verification;
