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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const mobileNav = [
  { name: "Faucet", path: "/home/testnet/faucet", state: true },
  { name: "Get token", path: "https://app.optimism.io/faucet", state: true },
  { name: "Explore Propout", path: "/list", state: true },
  {
    name: "Join the waitlist",
    path: "http://waitlist-propout.onrender.com",
    state: true,
  },
];
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

            <div className="hidden lg:flex items-center gap-6">
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

            <Sheet>
              <SheetTrigger asChild>
                <img src="/images/menu-icon.svg" alt="" />
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col text-white gap-2 my-2">
                  {mobileNav.map((link, i) => (
                    <Link key={i} to={link.path}>
                      <div className="hover:bg-gray-50 rounded-md hover:text-gray-900 pl-3 py-2">
                        {link.name}
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="lg:flex items-center gap-8 mt-24">
                  <Connect />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </Wrapper>
      </div>
    </>
  );
};

export default Header;
