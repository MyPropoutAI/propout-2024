import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb";

const client = createThirdwebClient({
  clientId: "1639134fe6d77249631aa361f3a9cbe1",
});

export const contract = getContract({
  client,
  chain: defineChain(122),
  address: "0x41b553358eC830A42c677836C995B1E8De38482C",
});

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
