import React from "react";
import Referrals from "./Referrals";
import Referhero from "./Referhero";

const Refer = () => {
  return (
    <div className=" flex flex-col gap-4 rounded-md">
      <Referhero />

      <div className="bg-white rounded-lg p-4">
        <Referrals />
      </div>
    </div>
  );
};

export default Refer;
