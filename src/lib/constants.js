import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb";

export const client = createThirdwebClient({
  clientId: "7689015a7891cb9951eb5e957933ef90",
});

export const chain = defineChain(4202);

export const activeChainName = "Lisk";

export const listingContract = getContract({
  client,
  chain,
  address: "0x05f62c33040C64dd03718A17E477A4b710c1Fbd2", // lisk testnet
});
export const stakingContract = getContract({
  client,
  chain,
  address: "0x58ea82992BE75FCCE209956C04e72c9f44AF21FD", // lisk testnet
});

// https://thirdweb.com/lisk-sepolia-testnet/0x05f62c33040C64dd03718A17E477A4b710c1Fbd2
