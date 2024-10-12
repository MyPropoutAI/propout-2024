import { useState } from "react";
import { Rings } from "react-loader-spinner";
//import { FormSchema } from "../../../lib/FormSchema";
import { Controller, useForm } from "react-hook-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../../../components/ui/input-otp";
import { useOtp } from "../../../contexts/hooks/useOtp";
import { Toaster } from "../../../components/ui/sonner";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import jwt from "jsonwebtoken";
//import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../components/ui/button";

const Otp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { otp, error, success } = useOtp();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const user = useSelector((state) => state.auth.user);
  const decodedUser = jwt.decode(user);

  const onSubmit = async (data) => {
    //console.log(data);
    setIsLoading(true);
    //console.log("Form data:", data);
    const res = await otp(decodedUser.id, data.otp);
    console.log(res);
    if (error) {
      console.log(res.error);
      setIsLoading(false);
      toast.error("Error", {
        description: error,
      });
    } else {
      setIsLoading(false);
      toast.success("Success", {
        description: success,
      });
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
          <h2 className="text-2xl font-semibold mb-2 text-center">
            Please enter the otp code sent to your email
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center items-center"
          >
            <div className="my-2">
              <Controller
                name="otp"
                control={control}
                defaultValue=""
                render={({ field: { onChange, onBlur, value } }) => (
                  <div>
                    <InputOTP
                      type="text"
                      id="otp"
                      name="otp"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      maxLength={6}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      {/* <InputOTPSeparator /> */}
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                )}
              />
            </div>

            <Button
              className="py-2 my-3 w-[100%] text-center font-semibold rounded-md z-50 bg-gradient-to-r from-[#C064F8] to-[#FF087F] text-white  px-4  shadow-sm"
              type="submit"
              disables={isLoading}
            >
              {isLoading ? "" : "Verify your email"}

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
            </Button>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Otp;
