import { useState } from "react";
import { Countries } from "../lib/Countries";
import { Rings } from "react-loader-spinner";
import { useSelector } from "react-redux";
import jwt from "jsonwebtoken";
import { useUpdateProfile } from "../contexts/hooks/useUpdateProfile";
import { toast } from "sonner";
const Profilesetting = () => {
  const [form, setForm] = useState({
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
  });
  const { updateProfile, loading, success } = useUpdateProfile();
  const user = useSelector((state) => state.auth.user);
  const decodedUser = jwt.decode(user);

  const handleFormChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };
  const handleSubmit = async () => {
    const data = { ...form, userId: decodedUser?.id };
    //console.log(data);
    const res = await updateProfile(data);
    console.log(res);
    if (res.error) {
      console.log(res.error.message);
      toast.error("Error", {
        description: res.error.message,
      });
    } else {
      toast.success("Success", {
        description: success,
      });
      // queryClient.invalidateQueries("user");
    }
  };

  return (
    <div>
      <h1 className="text-left text-[#320051] font-semibold py-2">
        Profile settings
      </h1>
      <hr />
      <div>
        <div className="md:flex gap-5">
          <div className="flex-1">
            <p className="text-[#320051] py-2 text-lg ">Full name</p>
            <input
              type="text"
              placeholder="Full name"
              name="name"
              className="outline-[#320051] border rounded-md px-2 py-2 w-full"
              onChange={(e) => handleFormChange("_name", e)}
            />
          </div>
          <div className="flex-1">
            <p className="text-[#320051] py-2 text-lg">Phone number</p>
            <input
              type="tel"
              placeholder="+234 *****"
              name="phone_number"
              className="outline-[#320051] border rounded-md px-2 py-2 w-full"
              onChange={(e) => handleFormChange("_phone_number", e)}
            />
          </div>
        </div>

        <div className="md:flex gap-5">
          <div className="flex-1">
            <p className="text-[#320051] py-2 text-lg ">Address</p>
            <input
              type="text"
              placeholder="Address..."
              name="address"
              className="outline-[#320051] border rounded-md px-2 py-2 w-full"
              onChange={(e) => handleFormChange("_address", e)}
            />
          </div>
          <div className="flex-1">
            <p className="text-[#320051] py-2 text-lg">Occupation</p>
            <input
              type="text"
              placeholder="Designer"
              name="occupation"
              className="outline-[#320051] border rounded-md px-2 py-2 w-full"
              onChange={(e) => handleFormChange("_occupation", e)}
            />
          </div>
        </div>

        <div className="md:flex gap-5">
          <div className="flex-1">
            <p className="text-[#320051] py-2 text-lg ">Facebook Url</p>
            <input
              type="text"
              placeholder="Facebook url..."
              name="facebook"
              className="outline-[#320051] border rounded-md px-2 py-2 w-full"
              onChange={(e) => handleFormChange("_facebook", e)}
            />
          </div>
          <div className="flex-1">
            <p className="text-[#320051] py-2 text-lg">Instagram Url</p>
            <input
              type="text"
              placeholder="Instagram url..."
              name="instagram"
              className="outline-[#320051] border rounded-md px-2 py-2 w-full"
              onChange={(e) => handleFormChange("_instagram", e)}
            />
          </div>
        </div>

        <div className="md:flex gap-5">
          <div className="flex-1">
            <p className="text-[#320051] py-2 text-lg ">Twitter Url</p>
            <input
              type="text"
              placeholder="Twitter url..."
              name="twitter"
              className="outline-[#320051] border rounded-md px-2 py-2 w-full"
              onChange={(e) => handleFormChange("_twitter", e)}
            />
          </div>
          <div className="flex-1">
            <p className="text-[#320051] py-2 text-lg">Linkedin Url</p>
            <input
              type="text"
              placeholder="Linkedin url..."
              name="linkedin"
              className="outline-[#320051] border rounded-md px-2 py-2 w-full"
              onChange={(e) => handleFormChange("_linkedin", e)}
            />
          </div>
        </div>

        <div className="md:flex gap-5">
          <div className="flex-1">
            <p className="text-[#320051] py-2 text-lg ">Website Url</p>
            <input
              type="text"
              placeholder="Website url..."
              name="website"
              className="outline-[#320051] border rounded-md px-2 py-2 w-full"
              onChange={(e) => handleFormChange("_website", e)}
            />
          </div>
        </div>

        <div className="md:flex gap-5">
          <div className="flex-1">
            <p className="text-[#320051] py-2 text-lg ">Email address</p>
            <input
              type="email"
              placeholder="Joelpillar@gmail.com"
              name="email"
              className="outline-[#320051] border rounded-md px-2 py-2 w-full"
              onChange={(e) => handleFormChange("_email", e)}
            />
          </div>
          <div className="flex-1">
            <p className="text-[#320051] py-2 text-lg">City</p>
            <input
              type="text"
              placeholder="City..."
              name="city"
              className="outline-[#320051] border rounded-md px-2 py-2 w-full"
              onChange={(e) => handleFormChange("_city", e)}
            />
          </div>
        </div>

        <div className="md:flex gap-5">
          <div className="flex-1">
            <p className="text-[#320051] py-2 text-lg ">Country</p>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              onChange={(e) => handleFormChange("_country", e)}
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
            <input
              type="text"
              placeholder="Sent 14m for those houses on rent"
              name="description"
              className="outline-[#320051] border rounded-md px-2 py-2 w-full"
              onChange={(e) => handleFormChange("_description", e)}
            />
          </div>
        </div>

        <div className="flex justify-center mx-5 mt-4 ">
          <button
            type="button"
            onClick={handleSubmit}
            className=" bg-btnGrad text-white rounded-md font-bold px-5 py-2 flex-1"
          >
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
              "Update Profile"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profilesetting;
