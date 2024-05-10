import React from "react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className=" mx-auto">
      <div className="flex min-h-screen">
        <div className="bg-[#220136] p-4 flex-1 bg-login-bg  min-h-full grid place-items-center">
          <img
            src="/images/propout.svg"
            alt=""
            className="flex justify-center items-center "
          />
        </div>
        <div className="flex flex-1 p-7 flex-col gap-4">
          <h1 className="text-left text-3xl mt-7 font-bold">Sign up</h1>

          <input
            type="text"
            placeholder="First Name"
            className="border w-full rounded-md border-black py-3 px-4"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="border w-full rounded-md border-black py-3 px-4"
          />

          <input
            type="text"
            placeholder="Email address"
            className="border w-full rounded-md border-black py-3 px-4"
          />
          <input
            type="password"
            placeholder="Password"
            className="border w-full rounded-md border-black py-3 px-4"
          />
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center text-[17px]">
              <input
                type="checkbox"
                className=" accent-[#964CC3] rounded-lg h-5 w-5"
              />
              <p>Remember Password</p>
            </div>

            <p className="text-[#964CC3]">Forgotten Password</p>
          </div>

          <Button className="text-white rounded-lg">Sign up</Button>
          <div>
            <p className="text-center">
              Already havean account?
              <span>
                <Link to={"/login"} className="text-[#964CC3] ml-1">
                  Log in
                </Link>
              </span>
            </p>

            <div className=" flex flex-col -center">
              <div class="hr-with-text">
                <span class="hr-text">Or continue with</span>
              </div>
              <div className="flex gap-3 justify-center">
                <button>
                  <img src="/images/flat-color-icons_google.svg" alt="" />
                </button>
                <button>
                  <img src="/images/flat-color-icons_facebook.svg" alt="" />
                </button>
                <button>
                  <img src="/images/flat-color-icons_twitter.svg" alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
