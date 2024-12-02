import { useForm } from "react-hook-form";
import { Countries } from "../lib/Countries";
import { Rings } from "react-loader-spinner";
import { useSelector } from "react-redux";
import jwt from "jsonwebtoken";
import { useUpdateProfile } from "../contexts/hooks/useUpdateProfile";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
//import { UploadToCloudinary } from "../../components/UploadToCloudinary";
import { UploadToCloudinary } from "./UploadToCloudinary";
const Profilesetting = () => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: "",
      phone_number: "",
      address: "",
      occupation: "",
      email: "",
      country: "",
      description: "",
      city: "",
      facebook: "",
      instagram: "",
      twitter: "",
      linkedIn: "",
      website: "",
    },
  });

  const { updateProfile, loading, success, error } = useUpdateProfile();
  const user = useSelector((state) => state.auth.user);
  const decodedUser = jwt.decode(user);
  const [profileImage, setProfileImage] = useState(null);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const profileImageUrl = await UploadToCloudinary(file);
    console.log("profileImageUrl", profileImageUrl.secure_url);
    if (profileImageUrl) {
      setProfileImage(URL.createObjectURL(file));
      setValue("profilePicture", profileImageUrl?.secure_url); // Set the file in form state
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [], // Accept image files only
    },
  });
  //console.log("raw profile image", profileImage);
  const onSubmit = async (data) => {
    //
    const profileData = {
      ...data,
      userId: decodedUser?.id,
    };

    const res = await updateProfile(profileData);

    if (error) {
      toast.error("Error", {
        description: res.error.message,
      });
    } else {
      toast.success("Success", {
        description: success,
      });
    }
  };

  return (
    <div>
      <h1 className="text-left text-[#320051] font-semibold py-2">
        Profile settings
      </h1>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Profile Image Upload */}
        <div className="flex flex-col items-center mb-5 mt-3">
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-[#320051] rounded-full w-[10rem] h-[10rem] p-5 flex justify-center items-center flex-col items-center cursor-pointer hover:bg-gray-100 transition"
          >
            <input {...getInputProps()} />
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : (
              <p className="text-[#320051] text-center">
                Upload profile picture
              </p>
            )}
          </div>
        </div>

        <div className="md:flex gap-5">
          <div className="flex-1">
            <p className="text-[#320051] py-2 text-lg ">Full name</p>
            <input
              type="text"
              placeholder="Full name"
              {...register("name")}
              className="outline-[#320051] border rounded-md px-2 py-2 w-full"
            />
          </div>
          <div className="flex-1">
            <p className="text-[#320051] py-2 text-lg">Phone number</p>
            <input
              type="tel"
              placeholder="+234 *****"
              {...register("phone_number")}
              className="outline-[#320051] border rounded-md px-2 py-2 w-full"
            />
          </div>
        </div>

        <div className="md:flex gap-5">
          <div className="flex-1">
            <p className="text-[#320051] py-2 text-lg ">Address</p>
            <input
              type="text"
              placeholder="Address..."
              {...register("address")}
              className="outline-[#320051] border rounded-md px-2 py-2 w-full"
            />
          </div>
          <div className="flex-1">
            <p className="text-[#320051] py-2 text-lg">Occupation</p>
            <input
              type="text"
              placeholder="Designer"
              {...register("occupation")}
              className="outline-[#320051] border rounded-md px-2 py-2 w-full"
            />
          </div>
        </div>

        <div className="md:flex gap-5">
          <div className="flex-1">
            <p className="text-[#320051] py-2 text-lg ">Facebook Url</p>
            <input
              type="text"
              placeholder="Facebook url..."
              {...register("facebook")}
              className="outline-[#320051] border rounded-md px-2 py-2 w-full"
            />
          </div>
          <div className="flex-1">
            <p className="text-[#320051] py-2 text-lg">Instagram Url</p>
            <input
              type="text"
              placeholder="Instagram url..."
              {...register("instagram")}
              className="outline-[#320051] border rounded-md px-2 py-2 w-full"
            />
          </div>
        </div>

        <div className="md:flex gap-5">
          <div className="flex-1">
            <p className="text-[#320051] py-2 text-lg ">Twitter Url</p>
            <input
              type="text"
              placeholder="Twitter url..."
              {...register("twitter")}
              className="outline-[#320051] border rounded-md px-2 py-2 w-full"
            />
          </div>
          <div className="flex-1">
            <p className="text-[#320051] py-2 text-lg">Linkedin Url</p>
            <input
              type="text"
              placeholder="Linkedin url..."
              {...register("linkedIn")}
              className="outline-[#320051] border rounded-md px-2 py-2 w-full"
            />
          </div>
        </div>

        <div className="md:flex gap-5">
          <div className="flex-1">
            <p className="text-[#320051] py-2 text-lg ">Website Url</p>
            <input
              type="text"
              placeholder="Website url..."
              {...register("website")}
              className="outline-[#320051] border rounded-md px-2 py-2 w-full"
            />
          </div>
        </div>

        <div className="md:flex gap-5">
          <div className="flex-1">
            <p className="text-[#320051] py-2 text-lg ">Email address</p>
            <input
              type="email"
              placeholder="Joelpillar@gmail.com"
              {...register("email")}
              className="outline-[#320051] border rounded-md px-2 py-2 w-full"
            />
          </div>
          <div className="flex-1">
            <p className="text-[#320051] py-2 text-lg">City</p>
            <input
              type="text"
              placeholder="City..."
              {...register("city")}
              className="outline-[#320051] border rounded-md px-2 py-2 w-full"
            />
          </div>
        </div>

        <div className="md:flex gap-5">
          <div className="flex-1">
            <p className="text-[#320051] py-2 text-lg ">Country</p>
            <select
              {...register("country")}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="1">Country</option>
              {Countries.map((country, i) => (
                <option key={i} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <p className="text-[#320051] py-2 text-lg">Description</p>
            <textarea
              placeholder="Sent 14m for those houses on rent"
              {...register("description")}
              className="outline-[#320051] border rounded-md px-2 py-2 w-full h-24"
            />
          </div>
        </div>

        <div className="flex justify-center mx-5 mt-4 ">
          <button
            type="submit"
            className="bg-btnGrad text-white rounded-md font-bold px-5 py-2 flex-1"
          >
            {loading ? (
              <Rings
                visible={true}
                height="40"
                width="40"
                ariaLabel="rings-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              "Update Profile"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profilesetting;
