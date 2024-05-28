import { Link } from "react-router-dom";
//import { useState, useEffect, useRef, Suspense } from "react";
import { Connect } from "./ConnectButton";
import Wrapper from "./Wrapper";
import User from "./User";
import { Button } from "./ui/button";
import jwt from "jsonwebtoken";
//import { useAuthContext } from "../contexts/hooks/useAuthcontext";
//import { useFetchUser } from "../contexts/hooks/useFetchUser";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.auth.user);

  const decodedUser = jwt.decode(user);

  const userAvartar = decodedUser.name.substring(0, 2);

  return (
    <>
      <div className="bg-purple-900 sticky top-0 z-10">
        <Wrapper>
          <div className="flex justify-between items-center text-white">
            <Link to={"/home"}>
              <img src="/images/pro2 1.svg" alt="Prop Logo" />
            </Link>

            <div className="flex items-center gap-6">
              {/* <div className="flex gap-2 items-center cursor-pointer">
              <img
                src="/images/Ellipse 10.svg"
                alt="Eclipse"
                className="w-10 aspect-square"
              />
              <img src="/images/dropdown.svg" alt="" className="w-4" />
            </div> */}
              <Link to="https://app.optimism.io/faucet">Get token</Link>

              <Button variant="propout" size="default">
                <Link to="/list">Explore Propout</Link>
              </Button>

              <div>
                <Connect />
              </div>
              <div>
                <User userAvartar={userAvartar} />
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
    </>
  );
};

export default Header;
