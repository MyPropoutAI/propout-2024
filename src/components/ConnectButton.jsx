// import { ConnectKitButton } from "connectkit";
import { ConnectWallet } from "@thirdweb-dev/react";
import { Button } from "./ui/button";
import { FuseSparknet } from "@thirdweb-dev/chains";

const supportedTokens = {
  [FuseSparknet.chainId]: [
    {
      address: "0x0c4BB3e2539b22f66dda2E4712f430944c3aCf95", // token contract address
      name: "$Prop-Coin",
      symbol: "PT",
      icon: "https://assets.coingecko.com/coins/images/9956/small/Badge_Dai.png?1687143508",
    },
  ],
};

export const ConnectButton = () => {
  return (
    <ConnectWallet
      switchToActiveChain={true}
      supportedTokens={supportedTokens}
    />
  );
};

// <ConnectKitButton.Custom>
//   {({ isConnected, show, truncatedAddress, ensName }) => {
//     return (
//       <Button onClick={show}>
//         {isConnected ? ensName ?? truncatedAddress : "Connect Wallet"}
//       </Button>
//     );
//   }}
// </ConnectKitButton.Custom>
