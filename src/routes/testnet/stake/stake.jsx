import React from "react";
import { Button } from "/src/components/ui/button";
import { IoSwapVerticalOutline } from "react-icons/io5";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { RiBnbFill } from "react-icons/ri";
import { SiSolana } from "react-icons/si";

const tokens = [
  {
    name: "BITCOIN",
    logo: <FaBitcoin />,
  },
  {
    name: "ETHEREUM",
    logo: <FaEthereum />,
  },
  {
    name: "BNB",
    logo: <RiBnbFill />,
  },
  {
    name: "SOLANA",
    logo: <SiSolana />,
  },
];

const Stake = () => {
  return (
    <div className=" bg-[#AB55DF]/55 bg-hero min-h-screen flex mx-auto ">
      <div className=" min-h-screen/50 mx-auto my-10 px-4 md:w-[700px] text-white ">
        <div className="bg-[#2A0144] flex flex-col items-center justify-center rounded-md  px-10 py-10">
          <h1 className="text-xl text-center pb-2 font-bold">Add Stake</h1>

          <div className="flex flex-col gap-4 w-full">
            <div className="rounded-md w-full  bg-[#964CC333]/20 px-4">
              <div id="stake bar">
                <div className="flex justify-between py-2 items-center">
                  <p>Stake</p>
                  <p className="text-[#fff]/20">
                    Available balance: 15.49 FUSE{" "}
                  </p>
                </div>
                <div className="bg-[#964CC3]/50 rounded-md  w-full py-4 px-4 flex justify-between items-center">
                  <p className="text-[#fff]/20">14 FUSE</p>
                  <p className="bg-[#320051] p-2 rounded-md">Max</p>
                </div>
              </div>
              <div className="flex gap-3 justify-between py-4">
                <div className="bg-[#964CC3]/40 text-center flex-1 rounded-md">
                  25%
                </div>
                <div className="bg-[#964CC3]/40 text-center flex-1 rounded-md">
                  50%
                </div>
                <div className="bg-[#964CC3]/40 text-center flex-1 rounded-md">
                  75%
                </div>
              </div>

              <div>
                <p className="py-1">Add duration</p>
                <div className="flex justify-between px-2 py-4 items-center text-[#fff]/20 rounded-md border border-[#964CC3]/20 ">
                  <p>90</p>
                  <p>DAYS</p>
                </div>
                <div className="flex gap-3 justify-between py-4">
                  <div className="bg-[#964CC3]/40 text-center flex-1 rounded-md">
                    90 DAYS
                  </div>
                  <div className="bg-[#964CC3]/40 text-center flex-1 rounded-md">
                    180 DAYS
                  </div>
                  <div className="bg-[#964CC3]/40 text-center flex-1 rounded-md">
                    365 DAYS
                  </div>
                </div>
              </div>

              <div>
                <p className="py-1">You will receive</p>
                <div className="flex justify-between px-2 py-4 items-center text-[#fff]/20 rounded-md border border-[#964CC3]/20 ">
                  <p>0.0 FUSE</p>
                </div>
              </div>
              <div id="footer">
                <div className="flex justify-between py-2 items-center   text-[#fff]/20">
                  <p>Added Stake:</p>
                  <p>0.0 FUSE</p>
                </div>
                <div className="flex justify-between py-2 items-center   text-[#fff]/20">
                  <p>Current Stake:</p>
                  <p>0.0</p>
                </div>
                <div className="flex justify-between py-2 items-center   text-[#fff]/20">
                  <p>Exchange Rate:</p>
                  <p>0.4 FUSE = 1 USDT</p>
                </div>
                <div className="flex justify-between py-2 items-center   text-[#fff]/20">
                  <p>Staking Reward</p>
                  <p>0%</p>
                </div>
                <div className="flex justify-between py-2 items-center   text-[#fff]/20">
                  <p>Staking Fee</p>
                  <p>10%</p>
                </div>
              </div>

              <div className=" rounded-md mx-5 my-3">
                <Button
                  size="lg"
                  className=" bg-btnGrad text-white lg mt-4 rounded-md text-xl flex justify-center items-center gap-2 w-full "
                >
                  <img src="/images/Vector-1.svg" alt="" />
                  Connect wallet
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stake;
