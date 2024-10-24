import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb";

const client = createThirdwebClient({
  clientId: "1639134fe6d77249631aa361f3a9cbe1",
});

export const listingContract = getContract({
  client,
  chain: defineChain(4202),
  // address: "0xE9EfB15B4ba0361f6147bba9EBf6c8c2CB79f2A9",
  // address: "0xFA6e0Af166960b5AF66F66b583e1425608090D4E",
  // address: "0x98C5f41c8bC55C7151c305cDb42BABEE60A041df",
  // address: "0x015a833A1C704dF904f138621ea6b15f3d4bbdb0",
  address: "0x256C11fB5d8fe8BBae40F3Bf524fBdb8edCfc860",
});

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
