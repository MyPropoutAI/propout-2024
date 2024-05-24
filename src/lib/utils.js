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
  address: "0xE9EfB15B4ba0361f6147bba9EBf6c8c2CB79f2A9",
});

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
