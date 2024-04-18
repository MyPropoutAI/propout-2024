import React from "react";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
function InputField({ placeholder, type = "text", className = "" }) {
  return (
    <div
      className={`justify-center items-start px-7 py-6 text-sm rounded-md border border-black border-solid text-black text-opacity-50 max-md:px-5 max-md:max-w-full ${className}`}
    >
      <label htmlFor={`${type}-input`} className="sr-only">
        {placeholder}
      </label>
      <input
        type={type}
        id={`${type}-input`}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full bg-transparent outline-none"
      />
    </div>
  );
}

function PasswordField() {
  return (
    <div className="flex gap-5 justify-between py-5 pr-20 pl-8 text-sm whitespace-nowrap rounded-md border border-black border-solid text-black text-opacity-50 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
      <label htmlFor="password-input" className="sr-only">
        Password
      </label>
      <input
        type="password"
        id="password-input"
        placeholder="Password"
        aria-label="Password"
        className="w-full bg-transparent outline-none"
      />
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/c3e717f09e703977614b6ae2249b844cc862604de55a8119e153c7f9d7e9f859?apiKey=bbf9ac6af1f24c1b84cd517d4adf8c22&"
        alt=""
        className="shrink-0 self-start mt-1.5 aspect-[1.47] fill-stone-400 w-[22px]"
      />
    </div>
  );
}

function SocialButton({ src, alt }) {
  return (
    <div className="flex justify-center items-center p-0.5">
      <img src={src} alt={alt} className="w-5 aspect-square" />
    </div>
  );
}

export default function Register() {
  return (
    <div className="bg-white">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/bcc02915eb51ae502f5f31bc6ac9220c294975cdf4a22205f68392ec79b133f3?apiKey=bbf9ac6af1f24c1b84cd517d4adf8c22&"
            alt="Propout sign up image"
            className="grow w-full aspect-[0.68] max-md:mt-10 max-md:max-w-full"
          />
        </div>
        <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col self-stretch px-5 my-auto max-md:mt-10 max-md:max-w-full">
            <header className="flex flex-col self-start px-3 py-2.5 text-black">
              <h1 className="text-4xl font-bold">Sign up</h1>
              <p className="mt-5 text-sm">Welcome to Propout</p>
            </header>
            <form>
              <InputField placeholder="First name" className="mt-5" />
              <InputField placeholder="Last name" className="mt-5" />
              <InputField
                placeholder="Email address"
                type="email"
                className="mt-5"
              />
              <PasswordField />
              <div className="flex gap-2.5 self-start py-0.5 mt-5">
                <div className="flex justify-center items-center">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/16765d5d11b61db0f5379ef76daa1b2dad8ff4e843e8dba62632cf547e28e8e3?apiKey=bbf9ac6af1f24c1b84cd517d4adf8c22&"
                    alt=""
                    className="rounded-md aspect-[1.16] w-[42px]"
                  />
                </div>
                <label
                  htmlFor="remember-checkbox"
                  className="my-auto text-base text-black"
                >
                  Remember password
                </label>
                <input
                  type="checkbox"
                  id="remember-checkbox"
                  className="sr-only"
                />
              </div>
              <button
                type="submit"
                className="justify-center items-center px-5 py-3.5 mt-12 text-base font-bold text-white rounded-lg max-md:px-5 max-md:mt-10 max-md:max-w-full"
              >
                Sign up
              </button>
            </form>
            <div className="self-center mt-6 text-base text-purple-700">
              Already have an account?{" "}
              <a href="#" className="font-medium text-purple-700">
                Log in
              </a>
            </div>
            <div className="flex gap-5 items-center self-center py-2.5 pr-20 mt-5 text-base text-black max-md:flex-wrap max-md:pr-5">
              <div className="shrink-0 self-stretch my-auto h-px bg-black border border-black border-solid w-[119px]" />
              <div className="self-stretch">Or continue with </div>
              <div className="shrink-0 self-stretch my-auto h-px bg-black border border-black border-solid w-[119px]" />
            </div>
            <div className="flex gap-5 justify-between self-center py-2.5 pr-9 mt-4 max-md:pr-5">
              <SocialButton
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e147b6a1142524fd9a97281cb2e807ec8719ddb766adaf440f6963493a187355?apiKey=bbf9ac6af1f24c1b84cd517d4adf8c22&"
                alt="Google sign in"
              />
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/98b2c375a5478e7e6a952134f53b042e7638ae99c1a3b657cfa3ed969ec3c193?apiKey=bbf9ac6af1f24c1b84cd517d4adf8c22&"
                alt="Apple sign in"
                className="shrink-0 aspect-[1.41] w-[34px]"
              />
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8431a9745397c15ee0e5fb08363a6d4d3e971f99fb33901ed7eb2200e9935754?apiKey=bbf9ac6af1f24c1b84cd517d4adf8c22&"
                alt="Facebook sign in"
                className="shrink-0 w-6 aspect-square fill-sky-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
