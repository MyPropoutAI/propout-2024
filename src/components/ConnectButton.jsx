import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { createThirdwebClient } from "thirdweb";

import { useActiveWallet } from "thirdweb/react";

import { chain } from "../lib/constants";

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("com.trustwallet.app"),
  createWallet("org.uniswap"),
];

const client = createThirdwebClient({
  clientId: "1639134fe6d77249631aa361f3a9cbe1",
});
export const Connect = () => {
  const wallet = useActiveWallet();
  console.log(chain);
  return (
    <div className="relative">
      <ConnectButton
        wallets={wallets}
        client={client}
        chain={chain}
        autoConnect={{ timeout: 10000 }}
        switchButton={{
          label: "Wrong Network",

          style: {
            backgroundColor: "red",
            color: "white",
          },
        }}
        connectButton={{
          label: "",
          style: {
            backgroundImage: "linear-gradient(to right, #C064F8, #FF087F )",
            color: "white",
            minWidth: "",
            paddingBlock: "12px",
            fontWeight: 500,
            fontSize: "16px",
            paddingInlineStart: "60px",
            paddingInlineEnd: "30px",
          },
        }}
        detailsButton={{
          label: "Details",
          style: {
            paddingBlock: "10px",
            height: "54px",
          },
        }}
      />

      {!wallet && (
        <img
          src="/images/wallet.svg"
          alt=""
          className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6"
        />
      )}
    </div>
  );
};
