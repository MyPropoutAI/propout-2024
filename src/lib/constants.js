import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb";

const client = createThirdwebClient({
  clientId: "1639134fe6d77249631aa361f3a9cbe1",
});

export const chain = defineChain(4202);

export const listingContract = getContract({
  client,
  chain,
  address: "0x256C11fB5d8fe8BBae40F3Bf524fBdb8edCfc860",
});
