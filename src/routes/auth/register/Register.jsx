import { useState } from "react";
import { Input } from "../../../components/ui/input";
import { Rings } from "react-loader-spinner";
import { FormSchema } from "../../../lib/FormSchema";
import { useForm } from "react-hook-form";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
//import { AuthBg } from "../../../components/AuthBg";
import RemenberMe from "../../../components/RemenberMe";
import { SocialLogin } from "../../../components/SocialLogin";
import { Link } from "react-router-dom";
// import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

import { useSignup } from "../../../contexts/hooks/useSignup";

const Register = () => {
  const [showPw, setShowPw] = useState(false);
  const [pwType, setPwType] = useState("password");

  const { signup, error, loading } = useSignup();
  // const queryClient = useQueryClient();
  const toast = useToast();

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

  const onSubmit = async (data) => {
    console.log(data.password);

    await signup(data);
    if (error) {
      console.log(error);
      toast.error(error);
    }
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
          <h2 className="text-2xl font-semibold mb-2">Sign up</h2>
          <p className="mb-4">Welcome to Propout</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-2">
              <Input
                {...register("name", { required: true })}
                type="text"
                placeholder="Full name"
              />
              {errors.name && (
                <span className="error text-red-500 text-md">
                  {errors.name.message}
                </span>
              )}
            </div>

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

            <div className="my-2">
              <Input
                {...register("phone_number", { required: true })}
                type="tel"
                placeholder="Phone number"
              />
              {errors.phone_number && (
                <span className="error text-red-500 text-md">
                  {errors.phone_number.message}
                </span>
              )}
            </div>

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
            <div className="my-3 ">
              <RemenberMe />
            </div>
            <Button
              className="py-2 my-3 w-[100%] text-center font-semibold rounded-md bg-gradient-to-r from-[#C064F8] to-[#FF087F] text-white  px-4  shadow-sm"
              type="submit"
              disables={loading}
            >
              {loading ? "" : "Register"}

              {loading && (
                <Rings
                  visible={true}
                  height="40"
                  width="844fa94d"
                  ariaLabel="rings-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              )}
            </Button>
          </form>
          <p className="text-center">
            Already have an account?
            <Link to="/auth/login">
              <span className="text-[#9C0AE1] cursor-pointer">Login</span>
            </Link>
          </p>
          <div className="w-full flex justify-center items-center items-center">
            <SocialLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
