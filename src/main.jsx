import React, { useContext, useEffect, createContext } from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./lib/Router";

import { Context } from "./lib/Context";

import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  trustWallet,
  phantomWallet,
  localWallet,
} from "@thirdweb-dev/react";
import { FuseSparknet } from "@thirdweb-dev/chains";

import { ethers } from "ethers";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThirdwebProvider
      activeChain={FuseSparknet}
      clientId="1639134fe6d77249631aa361f3a9cbe1"
      supportedWallets={[
        metamaskWallet({
          recommended: true,
        }),
        coinbaseWallet(),
        walletConnect(),
        trustWallet(),
        phantomWallet(),
        localWallet(),
      ]}
    >
      <Context>
        <RouterProvider router={router} />
      </Context>
    </ThirdwebProvider>
  </React.StrictMode>
);

//     <Web3Provider>     </Web3Provider>
