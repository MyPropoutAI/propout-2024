import React from "react";

const Overviewhero = () => {
  return (
    <div className=" bg-refer-hero p-4 pb-10 h-64 bg-lilac rounded-md text-white">
      <div className="flex gap-5 items-end h-full justify-center">
        <div className="w-40 border-none bg-task-hero-card- bg-right bg-no-repeat  overflow-hidden  rounded-lg h-[120px] relative">
          <img
            src="/images/over-1.svg"
            alt=""
            className="absolute right-0 top-0 h-full translate-x-1/2 opacity-25"
          />
          <div className="h-full w-full bg-refer-gradient p-4 pt-8 ">
            <img src="/images/over-1.svg" alt="" />
            <p className=" font-thin text-[13px]">Total asset value </p>
            <p className="font-semibold">$1,000,000</p>
          </div>
        </div>

        <div className="w-40 border-none bg-task-hero-card- bg-right bg-no-repeat  overflow-hidden  rounded-lg h-[120px] relative">
          <img
            src="/images/over-2.svg"
            alt=""
            className="absolute right-0 top-0 h-full translate-x-1/2 opacity-25"
          />
          <div className="h-full w-full bg-refer-gradient p-4 pt-8 ">
            <img src="/images/over-2.svg" alt="" />
            <p className=" font-thin text-[13px]">Property Listed </p>
            <p className="font-semibold">20</p>
          </div>
        </div>

        <div className="w-40 border-none bg-task-hero-card- bg-right bg-no-repeat  overflow-hidden  rounded-lg h-[120px] relative">
          <img
            src="/images/over-3.svg"
            alt=""
            className="absolute right-0 top-0 h-full translate-x-1/2 opacity-25"
          />
          <div className="h-full w-full bg-refer-gradient p-4 pt-8 ">
            <img src="/images/over-3.svg" alt="" />
            <p className=" font-thin text-[13px]">Closed deals </p>
            <p className="font-semibold">15</p>
          </div>
        </div>

        <div className="w-40 border-none bg-task-hero-card- bg-right bg-no-repeat  overflow-hidden  rounded-lg h-[120px] relative">
          <img
            src="/images/over-4.svg"
            alt=""
            className="absolute right-0 top-0 h-full translate-x-1/2 opacity-25"
          />
          <div className="h-full w-full bg-refer-gradient p-4 pt-8 ">
            <img src="/images/over-4.svg" alt="" />
            <p className=" font-thin text-[13px]">Purchased properties </p>
            <p className="font-semibold">5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overviewhero;
