import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Taskhero = () => {
  return (
    <div>
      <div className=" bg-refer-hero p-4 pb-10 h-64 bg-lilac rounded-md text-white">
        <div className="flex gap-5 items-end h-full justify-center">
          <div className="w-40 border-none bg-refer-hero-card bg-right bg-no-repeat overflow-hidden rounded-lg h-[120px]">
            <div className="h-full w-full bg-refer-gradient p-4 pt-8 ">
              <img src="/images/taskpoint.svg" alt="" />
              <p className=" font-thin text-[15px]">Total Task Points</p>
              <p className="font-semibold">200,000</p>
            </div>
          </div>

          <div className="w-40 border-none bg-task-hero-card- bg-right bg-no-repeat  overflow-hidden  rounded-lg h-[120px] relative">
            <img
              src="/images/allpoint.svg"
              alt=""
              className="absolute right-0 top-0 h-full translate-x-1/2 opacity-25"
            />
            <div className="h-full w-full bg-refer-gradient p-4 pt-8 ">
              <img src="/images/allpoint.svg" alt="" />
              <p className=" font-thin text-[15px]">All Tasks </p>
              <p className="font-semibold">100</p>
            </div>
          </div>

          <div className="w-40 border-none bg-task-hero-card- bg-right bg-no-repeat  overflow-hidden  rounded-lg h-[120px] relative">
            <img
              src="/images/completed.svg"
              alt=""
              className="absolute right-0 top-0 h-full translate-x-1/2 opacity-25"
            />
            <div className="h-full w-full bg-refer-gradient p-4 pt-8 ">
              <img src="/images/completed.svg" alt="" />
              <p className=" font-thin text-[15px]">Completed Tasks </p>
              <p className="font-semibold">91</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taskhero;
