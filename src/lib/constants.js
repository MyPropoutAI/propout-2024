import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb";

const client = createThirdwebClient({
  clientId: "1639134fe6d77249631aa361f3a9cbe1",
});

export const chain = defineChain(4202);

export const activeChainName = "Lisk";

export const listingContract = getContract({
  client,
  chain,
  address: "0x05f62c33040C64dd03718A17E477A4b710c1Fbd2", // lisk testnet
});

// https://thirdweb.com/lisk-sepolia-testnet/0x05f62c33040C64dd03718A17E477A4b710c1Fbd2
