import { Link } from "react-router-dom";
import { Connect } from "./ConnectButton";

import User from "./User";
import jwt from "jsonwebtoken";

import { useSelector } from "react-redux";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

import { cn } from "../lib/utils";

const links = [
  { name: "Faucet", path: "https://sepolia-faucet.lisk.com/", state: true },
  // { name: "Get token", path: "https://app.optimism.io/faucet", state: !true },
  {
    name: "Generate E-Flyer",
    path: "https://propout-eflyer.onrender.com",
    state: !true,
  },
  {
    name: "Join the waitlist",
    path: "http://waitlist-propout.onrender.com",
    state: true,
  },
  // { name: "Faucet", path: "/testnet/faucet", state: true },
];

const mobileNav = [
  {
    name: "Overview",
    path: "/dashboard",
    img: "/images/overview.svg",
  },
  {
    name: " List Property",
    path: "/dashboard/list",
    img: "/images/List-p.svg",
  },
  {
    name: " My Property",
    path: "/dashboard/properties",
    img: " /images/my-p.svg",
  },
  {
    name: " Swap",
    path: "/home/testnet/swap",
    img: "/images/swap.svg",
  },
  {
    name: " Stake ",
    path: "/home/testnet/stake",
    img: "/images/stake.svg",
  },
  {
    name: "Task",
    path: "/dashboard/task",
    img: "/images/task.svg",
  },
  {
    name: " Refer a friend",
    path: "/dashboard/referral",
    img: "/images/refer.svg",
  },
  {
    name: "Settings",
    path: "/dashboard/setting",
    img: "/images/setting.svg",
  },
  // { name: "Faucet", path: "/home/testnet/faucet", state: true },
  { name: "Faucet", path: "https://sepolia-faucet.lisk.com/", state: true },
  {
    name: "Join the waitlist",
    path: "http://waitlist-propout.onrender.com",
    state: true,
  },
];

const AuthHeader = ({ bg }) => {
  const user = useSelector((state) => state.auth.user);

  const userToken = user;
  const decodedUser = jwt.decode(userToken);

  const userAvartar = decodedUser.name.substring(0, 2);

  return (
    <div
      className={cn(
        "sticky top-0 z-10 text-black px-6",
        bg ? `!text-white ${bg} py-1` : "bg-white"
      )}
    >
      <div className="flex justify-between items-center text-whit">
        <div className="flex items-center gap-10">
          <Link to={"/home"}>
            <img src="/images/pro2 1.svg" alt="Prop Logo" />
          </Link>
          <div className="lg:flex text-lg gap-5 hidden">
            {links.map((link, i) => (
              <Link
                key={i}
                to={link.path}
                target={link.name == "Faucet" ? "_blank" : "_self"}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="lg:flex items-center gap-8 hidden">
          <div className=" h-12 aspect-square rounded-xl bg-[#C064F8] grid place-items-center relative">
            <img src="/images/bell.svg" className="h-7 aspect-square" />
            <span className="h-3 aspect-square bg-[#E72BAC] rounded-full absolute right-3 top-3"></span>
          </div>
          <Connect />
        </div>

        <div className="lg:hidden flex items-center gap-5">
          <div className=" h-12 aspect-square rounded-xl bg-[#C064F8] grid place-items-center relative">
            <img src="/images/bell.svg" className="h-7 aspect-square" />
            <span className="h-3 aspect-square bg-[#E72BAC] rounded-full absolute right-3 top-3"></span>
          </div>
          <User userAvartar={userAvartar} />
          <div>
            <Sheet>
              <SheetTrigger asChild>
                <img src="/images/menu-icon.svg" alt="" />
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col text-white gap-2 my-2">
                  {mobileNav.map((link, i) => (
                    <Link
                      key={i}
                      to={link.path}
                      target={link.name == "Faucet" ? "_blank" : "_self"}
                    >
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
        </div>
      </div>
    </div>
  );
};

export default AuthHeader;
