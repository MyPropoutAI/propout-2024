import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient } from "@tanstack/react-query";

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
import { Fuse } from "@thirdweb-dev/chains";
import { Web3Provider } from "./lib/Web3Provider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Web3Provider>
      <ThirdwebProvider
        // queryClient={queryClient}
        activeChain={Fuse}
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
    </Web3Provider>
  </React.StrictMode>
);

//     <Web3Provider>     </Web3Provider>
