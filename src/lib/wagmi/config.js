import { http, createConfig } from "wagmi";
import { fuse } from "wagmi/chains";
import { injected, metaMask, safe } from "wagmi/connectors";
// import { walletConnect } from "wagmi/connectors";

// const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

export const config = createConfig({
  chains: [fuse],
  connectors: [injected(), metaMask(), safe()],
  // connectors: [walletConnect({ projectId })],
  transports: {
    [fuse.id]: http(),
  },
});
