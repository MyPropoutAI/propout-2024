import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Referhero = () => {
  return (
    <div>
      <div className=" bg-refer-hero p-4 pb-10 h-64 bg-lilac rounded-md text-white">
        <div className="flex gap-5 items-end h-full justify-center">
          <div className="w-40 border-none bg-refer-hero-card bg-right bg-no-repeat overflow-hidden rounded-lg h-[120px]">
            <div className="h-full w-full bg-refer-gradient p-4 pt-8 ">
              <img src="/images/refpoints.svg" alt="" />
              <p className=" font-thin text-[15px]">Referral Points</p>
              <p className="font-semibold">50,000</p>
            </div>
          </div>

          <div className="w-40 border-none bg-refer-hero-card-2 bg-right bg-no-repeat overflow-hidden  rounded-lg h-[120px]">
            <div className="h-full w-full bg-refer-gradient p-4 pt-8 ">
              <img src="/images/refer-vector.png" alt="" />
              <p className=" font-thin text-[15px]">Total Referred </p>
              <p className="font-semibold">30</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referhero;
