import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";

const Leftsidebar = () => {
  return (
    <div className="flex flex-col justify-between gap-10 bg-white p-4 text-[12px] rounded-md font-semibold text-[#320051]">
      <div className="flex flex-col gap-2">
        <Link to="/dashboard/overview" className="flex items-center gap-1">
          <img src="/images/overview.svg" alt="icon" />
          Overview
        </Link>
        <Link to="/dashboard/list" className="flex items-center gap-1">
          <img src="/images/List-p.svg" alt="icon" />
          List Property
        </Link>
        <Link to="/dashboard/properties" className="flex items-center gap-1">
          <img src="/images/my-p.svg" alt="icon" />
          My Property
        </Link>
        <Link to="/testnet/swap" className="flex items-center gap-1">
          <img src="/images/swap.svg" alt="icon" />
          Swap
        </Link>
        <Link to="/testnet/stake" className="flex items-center gap-1">
          <img src="/images/stake.svg" alt="icon" />
          Stake
        </Link>
        <Link to="/dashboard/task" className="flex items-center gap-1">
          <img src="/images/task.svg" alt="icon" />
          Task
        </Link>
        <Link to="/dashboard/referral" className="flex items-center gap-1">
          <img src="/images/refer.svg" alt="icon" />
          Refer a friend
        </Link>
        <Link to="/dashboard/setting" className="flex items-center gap-1">
          <img src="/images/setting.svg" alt="icon" />
          Settings
        </Link>
      </div>
      <div>
        <Button size="guide" className="text-white px-16 py-2 rounded-md">
          <Link to="">GUIDE</Link>
        </Button>
      </div>
    </div>
  );
};

export default Leftsidebar;
