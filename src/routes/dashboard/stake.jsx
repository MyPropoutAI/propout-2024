import { useActiveAccount } from "thirdweb/react";
import { chain, client } from "../../lib/constants";

import { getWalletBalance } from "thirdweb/wallets";
import { useEffect, useState } from "react";
import TransactionBtn from "../../components/TransactionBtn";

const Stake = () => {
  const account = useActiveAccount();

  const [bal, setBal] = useState("0.00");

  const [stakeAmount, setStakeAmount] = useState(0);

  async function getBalance() {
    if (account) {
      const balance = await getWalletBalance({
        address: account.address,
        client,
        chain,
      });

      setBal(parseFloat(balance.displayValue).toFixed(3));
    } else {
      setBal("0.00");
      setStakeAmount(0);
    }
  }

  useEffect(() => {
    getBalance();
  }, [account]);

  function handleClick(percent) {
    setStakeAmount((parseFloat(bal) * (percent / 100)).toFixed(3));
  }

  return (
    <div className="w-[90%] md:w-full max-w-[100%] rounded-2xl  bg-[#2A0144] p-10">
      <p className="text-white text-center text-xl md:text-2xl">Add Stake</p>

      <div className="mt-10 bg-[#40105d] p-4 py-6 rounded-2xl text-white text-lg font-semibold">
        <div className="flex justify-between items-center">
          <p>Stake</p>
          <p className="text-gray-400">
            <span>{bal} Lisk</span>
          </p>
        </div>
        <div className="rounded-xl bg-[#964CC380] p-3 mt-2 flex items-center gap-3 w-[100%]">
          <img
            src="/images/lisk-logo-3.svg"
            alt=""
            className="size-12 invert-0 contrast-100 "
          />
          <input
            type="number"
            placeholder="0.0 Lisk"
            className="bg-transparent outline-none w-[90%]"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(parseFloat(e.target.value))}
          />
          <button
            className="bg-slate-900 p-1  px-2 rounded-md text-sm disabled:opacity-30"
            onClick={() => {
              setStakeAmount(bal);
            }}
            disabled={!account}
          >
            max
          </button>
        </div>

        <div className="flex  justify-between gap-6 mt-5">
          <span
            className="block py-2 bg-[#964CC380] w-full text-center rounded-md cursor-pointer"
            onClick={() => {
              handleClick(25);
            }}
          >
            25%
          </span>
          <span
            className="block py-2 bg-[#964CC380] w-full text-center rounded-md cursor-pointer"
            onClick={() => {
              handleClick(50);
            }}
          >
            50%
          </span>
          <span
            className="block py-2 bg-[#964CC380] w-full text-center rounded-md cursor-pointer"
            onClick={() => {
              handleClick(75);
            }}
          >
            75%
          </span>
        </div>

        {/* duration */}

        <div className="mt-5">
          <p>Add duration</p>
          <div className="rounded-xl bg-[#964CC380] p-3 mt-2 flex items-center gap-3">
            <img src="/images/calendar.svg" alt="" className="size-8  " />
            <input
              type="number"
              placeholder="90"
              className="bg-transparent flex-1 outline-none w-[60%]"
            />
            <p className="text-gray-400">DAYS</p>
          </div>
          <div className="flex  justify-between gap-6 mt-5">
            <span className="block py-2 bg-[#964CC380] w-full text-center rounded-md cursor-pointer">
              90 days
            </span>
            <span className="block py-2 bg-[#964CC380] w-full text-center rounded-md cursor-pointer">
              180 days
            </span>
            <span className="block py-2 bg-[#964CC380] w-full text-center rounded-md cursor-pointer">
              365 days
            </span>
          </div>
        </div>

        {/* reward */}

        <div className="mt-5">
          <p>You will receive</p>
          <div className="rounded-xl bg-[#964CC380] p-3 mt-2 flex items-center gap-3">
            <img src="/images/pro2 1.svg" alt="" className="size-8  " />
            <input
              type="number"
              placeholder="0 $Prop-coin"
              className="bg-transparent flex-1 outline-none !text-white"
              disabled
              onChange={(e) => setStakeAmount(parseFloat(e.target.value))}
            />
          </div>
        </div>

        {/* info */}

        <div className="flex flex-col gap-2 mt-8 text-gray-400">
          <div className="flex gap-4 justify-between items-center">
            <p>Added stake</p>
            <p>{stakeAmount}</p>
          </div>
          <div className="flex gap-3 justify-between items-center">
            <p>Current stake</p>
            <p>{stakeAmount}</p>
          </div>
          <div className="flex gap-3 justify-between items-center">
            <p>Staking reward</p>
            <p>{stakeAmount}</p>
          </div>
          <div className="flex gap-3 justify-between items-center">
            <p>Staking fee</p>
            <p>{stakeAmount}</p>
          </div>
        </div>

        {/* transaction button */}

        <div className="mt-10">
          <TransactionBtn
            transaction={() => {}}
            onTransactionConfirmed={() => {}}
            text="Stake"
            style={{
              backgroundImage: "linear-gradient(to right, #C064F8, #FF087F)",
              color: "#FFF",
              padding: "20px",

              width: "100%",

              borderRadius: "8px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Stake;
