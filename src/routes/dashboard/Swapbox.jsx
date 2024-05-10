import React from "react";
import { Button } from "/src/components/ui/button";
import { IoSwapVerticalOutline } from "react-icons/io5";
const Swapbox = () => {
  return (
    <div>
      <div id="transaction" className="flex flex-col items-center">
        <div id="pay" className="flex-1">
          <p>You pay</p>
          <div>FUSE</div>
        </div>
        <div className="flex justify-center">
          <IoSwapVerticalOutline />
        </div>
        <div id="receive" className="flex-1">
          <p>You receive</p>
          <div>USDT</div>
        </div>
        <div className=" rounded-md mx-5 my-3">
          <Button
            size="lg"
            className="bg-btnGrad text-white lg mt-4 rounded-md text-xl flex justify-center items-center gap-2 w-full "
          >
            <img src="/images/Vector-1.svg" alt="" />
            Connect wallet
          </Button>
        </div>
      </div>
      {/* <div className=" flex flex-col justify-center items-center">
        <div className="bg-[#2A0144]  max-w-[550px] p-5 rounded-md">
          <div className="text-[#FFFFFF]">
            <h1 className="font-bold text-center text-2xl py-3">
              Swap any asset
            </h1>
            <div className="bg-[#964CC3]/20 rounded-md">
              <p>You pay</p>
              <div className="w-full"></div>

              

              <div>
                <p>You receive</p>
                <div className="w-full px-3 py-2"></div>
              </div>
            </div>
           
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Swapbox;
