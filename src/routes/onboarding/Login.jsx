import React from "react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-4">
        <h1 className="text-left text-3xl mt-7 font-bold">Login</h1>

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

        <Button className="text-white rounded-lg">Log in</Button>
        <div>
          <p className="text-center">
            Dont have an account?
            <span>
              <Link to="/register" className="text-[#964CC3] ml-1">
                Sign up
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
  );
};

export default Login;
