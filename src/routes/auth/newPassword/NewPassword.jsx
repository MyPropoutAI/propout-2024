import { useState } from "react";
import { Input } from "../../../components/ui/input";
import { Rings } from "react-loader-spinner";
import { FormSchema } from "../../../lib/FormSchema";
import { useForm } from "react-hook-form";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
//import { AuthBg } from "../../../components/AuthBg";

const NewPassword = () => {
  const [showPw, setShowPw] = useState(false);
  const [pwType, setPwType] = useState("password");
  const [isLoading, setIsLoading] = useState(false);

  const handlePassword = () => {
    if (pwType == "password") {
      setPwType("text");
      setShowPw(true);
    } else {
      setPwType("password");
      setShowPw(false);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(FormSchema) });

  const onSubmit = (data) => {
    setIsLoading(true);
    console.log("Form data:", data);
    // Handle form submission logic here (e.g., send data to server)
  };
  return (
    <div className="w-full flex h-screen">
      <div
        className="hidden lg:flex w-[40%] bg-blue-900"
        style={{
          backgroundImage: "url('/images/authbg.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="w-[100%] lg:w-[60%] flex justify-center items-center">
        <div className="w-[70%]">
          <h2 className="text-2xl font-semibold mb-2">Create new password</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-2">
              <Input
                {...register("password", { required: true })}
                type={pwType}
                placeholder="password"
              />
              {errors.password && (
                <span className="error text-red-500 text-md">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="my-2 relative">
              <div className="absolute top-3 right-2">
                {showPw ? (
                  <EyeOff
                    className="w-5 h-5 text-gray-500"
                    onClick={handlePassword}
                  />
                ) : (
                  <Eye className="w-5 h-5" onClick={handlePassword} />
                )}
              </div>
              <Input
                {...register("confirmPassword", { required: true })}
                type={pwType}
                placeholder="Confirm password"
              />
              {errors.confirmPassword && (
                <span className="error text-red-500 text-md">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <button
              className="py-2 my-3 w-[100%] text-center font-semibold rounded-md bg-gradient-to-r from-[#C064F8] to-[#FF087F] text-white  px-4  shadow-sm"
              type="submit"
            >
              Create Password
              {isLoading && (
                <Rings
                  visible={true}
                  height="40"
                  width="844fa94d"
                  ariaLabel="rings-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
