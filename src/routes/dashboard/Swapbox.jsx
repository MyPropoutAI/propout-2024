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
const Swapbox = () => {
  return (
    <div className=" min-h-screen/50 mx-auto px-4 md:w-[600px] text-white ">
      <div className="bg-[#2A0144] flex flex-col items-center justify-center rounded-md  px-10 py-10">
        <h1 className="text-xl text-center pb-2">Swap Any Asset</h1>

        <div className="flex flex-col gap-4 w-full">
          <div className="rounded-md w-full  bg-[#964CC333]/20 px-4">
            <div id="pay">
              <p className="py-3 text-[#FFFFFF]/20">You pay</p>
              <div className="bg-[#964CC3]/50 rounded-md  w-full py-4 px-4 flex justify-between items-center">
                <select className="rounded-md px-1 py-3 bg-[#2A0144] text-white">
                  {tokens.map((token, index) => (
                    <option value="" key={index}>
                      {token.logo}
                      {token.name}
                    </option>
                  ))}
                </select>
                <p>0.10</p>
              </div>
            </div>

            <div className="flex justify-center py-2 text-xl">
              <IoSwapVerticalOutline />
            </div>
            <div id="receive">
              <p className="py-3 text-[#FFFFFF]/20">You receive</p>
              <div className="bg-[#964CC3]/50 rounded-md  w-full py-4 px-4 flex justify-between items-center">
                <select className="rounded-md px-1 py-3 bg-[#2A0144] text-white">
                  {tokens.map((token, index) => (
                    <option value="" key={index}>
                      {token.logo}
                      {token.name}
                    </option>
                  ))}
                </select>
                <p>0.10</p>
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
  );
};

export default Swapbox;
