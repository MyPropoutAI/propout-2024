import React from "react";
import Swaphistory from "../../../components/Swaphistory";
import Swapbox from "../../dashboard/Swapbox";
const Swap = () => {
  return (
    <div className=" bg-[#AB55DF]/55 bg-hero min-h-screen pb-10 ">
      <div className="flex flex-col w-full">
        <div>
          <Swapbox />
        </div>
        <div className="bg-[#320051] mx-6 rounded-md ">
          <Swaphistory />
        </div>
      </div>
    </div>
  );
};

export default Swap;
