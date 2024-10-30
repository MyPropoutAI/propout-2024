import React from "react";
import Overviewhero from "./Overviewhero";
import Taskhistory from "./Taskhistory";
import Overviewhistory from "./Overviewhistory";

const Overview = () => {
  return (
    <div className=" flex flex-col justify-center overflow-hidden">
      <div className="flex items-center justify-center">
        <Overviewhero />
      </div>
      <div className="bg-white   mt-4 rounded-md p-4">
        <Overviewhistory />
      </div>
    </div>
  );
};

export default Overview;
