import React from "react";
import { Button } from "../../components/ui/button";
import { Link, useLocation } from "react-router-dom";

const links = [
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
    path: "/testnet/swap",
    img: "/images/swap.svg",
  },
  {
    name: " Stake ",
    path: "/testnet/stake",
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
];

const Leftsidebar = () => {
  const location = useLocation();
  const { pathname } = location;

  const activeLink =
    "bg-gradient-to-r from-[#964DC3]  to-[#F42A8B] text-white ";

  return (
    <div className="flex flex-col justify-between gap-10 bg-white p-4 text-[12px] rounded-md font-semibold text-[#320051] w-[200px]">
      <div className="flex flex-col gap-2">
        {links.map((item) => (
          <Link to={item.path} className="flex items-center gap-1">
            <div
              className={`${
                pathname == item.path && "bg-[#964DC3]"
              } w-7 rounded-lg`}
            >
              <img
                src={item.img}
                alt="icon"
                className={`${
                  pathname == item.path && "invert brightness-50 contrast-200"
                }`}
              />
            </div>
            <span
              className={`${
                pathname == item.path && activeLink
              } flex-1 h-full flex items-center px-2 rounded-sm`}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </div>
      <div>
        <Button
          size="guide"
          className="text-white px-16 py-2 rounded-md w-full"
        >
          <Link to="">GUIDE</Link>
        </Button>
      </div>
    </div>
  );
};

export default Leftsidebar;
