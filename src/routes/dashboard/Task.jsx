import React from "react";
import Taskhero from "./Taskhero";
import Socialtask from "./Socialtask";
import Taskhistory from "./Taskhistory";

const Task = () => {
  return (
    <div>
      <Taskhero />

      <div className="bg-white rounded-md  mt-4 p-4">
        <p className="font-bold">Refer a friend</p>

        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="https://propout.xyz/joelpillar-TYA"
            className="py-1 border border-gray-500 px-5 w-[calc(100%-40%)]  rounded-md"
          />
          <button className="bg-[#964CC3] text-[#ffff] py-1 px-5 rounded-md">
            Copy
          </button>
        </div>
      </div>
      <div className="bg-white mt-4 p-4 rounded-md overflow-hidden">
        <Socialtask />
      </div>

      <div className="bg-white mt-4 rounded-md p-4">
        <Taskhistory />
      </div>
    </div>
  );
};

export default Task;
