// import React from "react";
// import Overviewhero from "./Overviewhero";
// import Taskhistory from "./Taskhistory";
//import Overviewhistory from "./Overviewhistory";
import AgentPropertyStats from "../../components/AgentPropertyStats";

const Overview = () => {
  return (
    <div className=" flex flex-col justify-center overflow-hidden">
      <div className="flex items-center justify-center">
        <AgentPropertyStats />
      </div>
      {/* <div className="bg-white   mt-4 rounded-md p-4">
        <Overviewhistory />
      </div> */}
    </div>
  );
};

export default Overview;
