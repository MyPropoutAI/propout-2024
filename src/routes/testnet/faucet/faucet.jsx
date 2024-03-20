import React from "react";
import { Button } from "/src/components/ui/button";
import { buttonVariants } from "../../../components/ui/button";

const Faucet = () => {
  return (
    <div>
      <div className="bg-hero bg-[#AB55DF] min-h-screen flex flex-col justify-center items-center">
        <div className="bg-[#2A0144]  max-w-[550px] p-5 rounded-md">
          <div className="text-[#FFFFFF]">
            <h1 className="font-bold text-center text-2xl py-3">
              FUSE Testnet Faucet
            </h1>
            <div className="bg-[#964CC3]/20 rounded-md mx-5 my-3">
              <div className="p-3">
                <p className=" font-bold text-xl mb-4">Request tokens</p>
                <p className="text-[#FFFFFF]/50 mb-3">
                  Receive FUSE testnet tokens that enable you to seamlessly
                  engage and explore the propout testnet environment.
                </p>

                <div className="">
                  <p className="text-[#FFFFFF]/50 mb-2">
                    Enter your FUSE address
                  </p>
                  <input
                    type="text"
                    placeholder="Ox..."
                    className="p-4 rounded-md w-full bg-[#964CC3]/50 outline-transparent"
                  />
                </div>
              </div>
            </div>
            <div className=" rounded-md mx-5 my-3">
              <Button
                size="lg"
                className="lg mt-4 rounded-md text-xl flex justify-center items-center gap-2 w-full "
              >
                <img src="/images/Vector-1.svg" alt="" />
                Connect wallet
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faucet;
