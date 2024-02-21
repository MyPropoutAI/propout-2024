import { useState } from "react";
import Wrapper from "../../components/Wrapper";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

import { Label } from "../../components/ui/label";

import { ethers } from "ethers";
import { toast } from "sonner";
const private_Key =
  "0xb79ccd1b062531869010ac01ed261c26e67f6ef623072818b57c0f25cfe63ffa";

const PeerToPeer = () => {
  const [receiver, setReceiver] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setReceiver(e.target.value);
  };

  const provider = new ethers.providers.JsonRpcProvider("https://rpc.fuse.io");

  async function send() {
    setLoading(true);
    const wallet = new ethers.Wallet(private_Key, provider);

    const tx = {
      to: receiver,
      value: ethers.utils.parseUnits("0.25", 18),
      gasLimit: 21000,
    };

    wallet
      .sendTransaction(tx)
      .then((tx) => {
        toast("You have received 0.25 Fuse", {
          description: `View your transaction on Fuse Explorer`,
          action: {
            label: "View",
            onClick: () => {
              window.open("https://explorer.fuse.io/tx/" + tx.hash, "_blank");
            },
          },
        });
      })
      .catch((error) => {
        toast.error("Something went wrong", {
          description: error.reason,
        });
      });
    setLoading(false);
  }

  return (
    <Wrapper>
      <h1 className="text-2xl lg:text-3xl font-bold text-center mt-10">
        Request Fuse Token
      </h1>
      <div className="mt-10 flex justify-center">
        <div className="p-10 border- relative  w-[500px] bg-white shadow-xl">
          <Label>Beneficiary*</Label>
          <Input
            name="address"
            placeholder="0x..."
            value={receiver}
            id="address"
            type="text"
            className="w-full mx-auto text-xLG p-3 mt-4"
            autoComplete="off"
            onInput={handleInput}
          />
          <div
            style={{
              cursor: receiver.length < 42 ? "not-allowed" : "pointer",
            }}
          >
            <Button
              className={`mt-5 text-white w-full rounded-lg `}
              onClick={send}
              disabled={receiver.length < 42}
              style={{
                cursor: receiver.length < 42 ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Requesting..." : "Send Me 0.25 Fuse"}
            </Button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default PeerToPeer;
