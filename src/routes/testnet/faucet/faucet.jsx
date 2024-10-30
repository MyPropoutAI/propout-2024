import { ConnectButton } from "thirdweb/react";
import { Button } from "/src/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { ethers } from "ethers";

import { activeChainName } from "../../../lib/constants";

const Faucet = () => {
  const [canClaim, setCanClaim] = useState(true);
  const [message, setMessage] = useState("");

  const [receiver, setReceiver] = useState("");
  const [isAddressValid, setIsAddressValid] = useState(!true);

  const private_Key = import.meta.env.VITE_WALLET_PRIVATE_KEY_FOR_FAUCET;

  const handleInput = (e) => {
    setReceiver(e.target.value);
    setIsAddressValid(ethers.utils.isAddress(e.target.value));
  };

  // const provider = new ethers.providers.JsonRpcProvider("https://rpc.fuse.io");
  const provider = new ethers.providers.JsonRpcProvider(
    "https://rpc.sepolia-api.lisk.com"
  );

  useEffect(() => {
    const lastClaimTime = localStorage.getItem("lastClaimTime");
    if (lastClaimTime) {
      const now = new Date().getTime();
      const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
      if (now - lastClaimTime < oneDay) {
        setCanClaim(false);
      }
    }
  }, []);

  const handleClaim = () => {
    if (!isAddressValid) {
      setMessage("Invalid wallet address.");
      return;
    }
    if (canClaim) {
      const wallet = new ethers.Wallet(private_Key, provider);

      const tx = {
        to: receiver,
        value: ethers.utils.parseUnits("0.001", 18),
        gasLimit: 21000,
      };
      wallet
        .sendTransaction(tx)
        .then((tx) => {
          toast("You have received 0.001 Lisk token", {
            description: `View your transaction on ${activeChainName} Explorer`,
            action: {
              label: "View",
              onClick: () => {
                window.open(
                  "https://sepolia-blockscout.lisk.com/tx/" + tx.hash,
                  "_blank"
                );
              },
            },
          });
          console.log(tx);
        })
        .catch((error) => {
          toast.error("Something went wrong", {
            description: error.reason,
          });
          console.log(error);
        });
      localStorage.setItem("lastClaimTime", new Date().getTime());
      setCanClaim(false);
      setMessage("Tokens claimed successfully!");
    } else {
      setMessage("You can only claim once every 24 hours.");
    }
  };
  return (
    <div>
      <div className="bg-hero bg-[#AB55DF] min-h-screen flex flex-col justify-center items-center">
        <div className="bg-[#2A0144]  max-w-[550px] p-5 rounded-md">
          <div className="text-[#FFFFFF]">
            <h1 className="font-bold text-center text-2xl py-3">
              Lisk Testnet Faucet
            </h1>
            <div className="bg-[#964CC3]/20 rounded-md mx-5 my-3">
              <div className="p-3">
                <p className=" font-bold text-xl mb-4">Request tokens</p>
                <p className="text-[#FFFFFF]/50 mb-3">
                  Receive LISK testnet tokens that enable you to seamlessly
                  engage and explore the propout testnet environment.
                </p>

                <div className="">
                  <p className="text-[#FFFFFF]/50 mb-2">
                    Enter your EVM address
                  </p>
                  <input
                    type="text"
                    placeholder="Ox.."
                    className="p-4 rounded-md w-full bg-[#964CC3]/50 outline-transparent"
                    value={receiver}
                    autoComplete="off"
                    onInput={handleInput}
                  />
                </div>
              </div>
            </div>
            <div className=" rounded-md mx-5 my-3">
              <Button
                size="lg"
                className="lg mt-4 rounded-md text-xl flex justify-center items-center gap-2 w-full border"
                onClick={handleClaim}
              >
                {canClaim ? "Claim Tokens" : "Already Claimed"}
                {/* <img src="/images/Vector-1.svg" alt="" /> */}
                {/* Connect wallet */}
                {/* <ConnectButton /> */}
                {/* <Connect /> */}
              </Button>
              {message && <p className="mt-5 text-gray-400">{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faucet;
