import React from "react";
import { Button } from "/src/components/ui/button";
import Swaphistory from "../../../components/Swaphistory";
import { IoSwapVerticalOutline } from "react-icons/io5";
const Swap = () => {
  return (
    <div className=" bg-[#AB55DF]/55 flex flex-col pb-10 ">
      {/* <div className="bg-hero bg-[#AB55DF]/55 min-h-screen flex flex-col justify-center items-center">
        <div className="bg-[#2A0144]  max-w-[550px] p-5 rounded-md">
          <div className="text-[#FFFFFF]">
            <h1 className="font-bold text-center text-2xl py-3">
              Swap any asset
            </h1>
            <div className="bg-[#964CC3]/20 rounded-md">
              <p>You pay</p>
              <div className="w-full"></div>

              <div className="flex justify-center">
                <IoSwapVerticalOutline />
              </div>

              <div>
                <p>You receive</p>
                <div className="w-full px-3 py-2"></div>
              </div>
            </div>
            <div className=" rounded-md mx-5 my-3">
              <Button
                size="lg"
                className="bg-btnGrad lg mt-4 rounded-md text-xl flex justify-center items-center gap-2 w-full "
              >
                <img src="/images/Vector-1.svg" alt="" />
                Connect wallet
              </Button>
            </div>
          </div>
        </div>
      </div> */}

      <div className="bg-[#320051] mx-6 rounded-md ">
        <Swaphistory />
      </div>
    </div>
  );
};

export default Swap;
