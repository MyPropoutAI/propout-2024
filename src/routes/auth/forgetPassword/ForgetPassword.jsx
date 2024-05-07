import { useState } from "react";
import { Input } from "../../../components/ui/input";
import { Rings } from "react-loader-spinner";
import { FormSchema } from "../../../lib/FormSchema";
import { useForm } from "react-hook-form";

//import { Button } from "../../../components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
//import { AuthBg } from "../../../components/AuthBg";
const Register = () => {
  const [isLoading, setIsLoading] = useState(false);

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
          <h2 className="text-2xl font-semibold mb-2">
            Please enter you email
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-2">
              <Input
                {...register("email", { required: true })}
                type="email"
                placeholder="email"
              />
              {errors.email && (
                <span className="error text-red-500 text-md">
                  {errors.email.message}
                </span>
              )}
            </div>

            <button
              className="py-2 my-3 w-[100%] text-center font-semibold rounded-md bg-gradient-to-r from-[#C064F8] to-[#FF087F] text-white  px-4  shadow-sm"
              type="submit"
            >
              Submit
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

export default Register;
