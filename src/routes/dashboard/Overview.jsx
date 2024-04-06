import React from "react";
import Overviewhero from "./Overviewhero";
import Taskhistory from "./Taskhistory";
import Overviewhistory from "./Overviewhistory";

const Overview = () => {
  return (
    <div>
      <Overviewhero />

      <div className="bg-white mt-4 rounded-md p-4">
        <Overviewhistory />
      </div>
    </div>
  );
};

export default Overview;
