import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
//import { abi } from "../../abi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Heart } from "lucide-react";
import {
  getContract,
  prepareContractCall,
  //resolveMethod,
  readContract,
} from "thirdweb";
import {
  useSendTransaction,
  useReadContract,
  useActiveAccount,
  //ThirdwebProvider,
  TransactionButton,
} from "thirdweb/react";
//import { useAccounts } from "@thirdweb-dev/react";
// import { client, liskSepolia } from "./thirdweb";
import { liskSepolia } from "../../lib/thirdweb";
import { client } from "../../lib/constants";
//import { sendAndConfirmTransaction } from "thirdweb";
//import { useReadContract } from "thirdweb/react";
//import { data } from "autoprefixer";

export default function AdvancedNFTMinting() {
  const [nftImage, setNftImage] = useState(null);
  const [rarity, setRarity] = useState("");
  const [isMinting, setIsMinting] = useState(false);
  const [nftDetail, setNftDetail] = useState(null);
  const [nftDetails, setNftDetails] = useState([]);
  const [recipient, setRecipient] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [whitelistAddresses, setWhitelistAddresses] = useState("");
  const [whitelistMembershipType, setWhitelistMembershipType] = useState("0");
  const contractAddress = "0x206a0b20f28290D0dAC891996b9B4C71baD549E9";

  const contract = getContract({
    client,
    address: contractAddress,
    chain: liskSepolia,
  });

  const activeAccount = useActiveAccount();
  const { mutate: sendTx } = useSendTransaction();

  useEffect(() => {
    setRecipient(activeAccount?.address);
    //console.log(activeAccount);
  }, [activeAccount]);

  const mintNFT = () => {
    //console.log(recipient);

    const transaction = prepareContractCall({
      contract,
      method: "function mintNFT(address to)",
      params: [recipient],
    });
    console.log(transaction);
    setNftDetail(transaction);
    return transaction;
  };

const fetchNFTDetails = async () => {
    const { data: nftIds, isPending: isNftIdsPending } = useReadContract({
      contract,
      method: "function getNFTsByOwner(address owner) view returns (uint256[])",
      params: [recipient],
    });

    if (nftIds.length > 0) {
      const lastNftId = nftIds[nftIds.length - 1];
      try {
        const data = await readContract({
          contract,
          method: "function tokenURI(uint256 tokenId) view returns (string)",
          params: [lastNftId],
        });
        console.log("NFT DATA", data);
        setNftDetails(data); // Assuming data contains the details
        setNftImage(data);
      } catch (error) {
        alert(Error Fetching Details: ${error.message});
      }
    }
  };

  const openMint = async () => {
    const contract = getContract({
      client,
      address: contractAddress,
      chain: liskSepolia,
    });

    const addresses = whitelistAddresses
      .split(",")
      .map((address) => address.trim());
    try {
      const transaction = prepareContractCall({
        contract,
        method: "openMint",
        params: [
          addresses,
          Array(addresses.length).fill(Number(whitelistMembershipType)),
        ],
      });
      const result = await sendTx(transaction);
      alert(
        "Minting Opened for Addresses! Transaction Hash: " +
          result.transactionHash
      );
    } catch (error) {
      alert(`Error Opening Mint: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br p-8">
      <main className="flex flex-col md:flex-row gap-8">
        <Card className="w-full md:w-2/3 p-6 bg-white rounded-lg shadow-xl">
          <h1 className="text-3xl font-bold mb-6">Mint Your NFT</h1>
          <div className="space-y-6">
            <div>
              <Label
                htmlFor="rarity"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Select Rarity
              </Label>
              <Select onValueChange={setRarity}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select rarity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="common">Common</SelectItem>
                  <SelectItem value="uncommon">Uncommon</SelectItem>
                  <SelectItem value="rare">Rare</SelectItem>
                  <SelectItem value="mythic">Mythic</SelectItem>
                  <SelectItem value="native">Native</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <TransactionButton
              transaction={mintNFT}
              onError={(error) => console.log(error)}
            >
              <Button
                // onClick={mintNFT}
                disabled={isMinting || !rarity}
                className="w-full bg-gradient-to-br from-purple-700 to-indigo -900 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
              >
                {isMinting ? "Minting..." : "Mint NFT"}
              </Button>
            </TransactionButton>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">NFT Details Lookup</h2>
            <div className="flex space-x-4">
              <Input
                placeholder="Enter NFT Token ID"
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
              />
              <Button>Fetch Details</Button>
            </div>
            {nftDetails && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-4 p-4 bg-gray-100 rounded-lg"
              >
                <h3 className="font-bold">{nftDetails.name}</h3>
                <p>Rarity: {nftDetails.rarity}</p>
                <p>Owner: {nftDetails.owner}</p>
              </motion.div>
            )}
          </div>
        </Card>
        <Card className="w-full md:w-1/3 p-6 bg-white rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold mb-4">NFT Preview</h2>
          <div className="border border-gray-200 rounded-lg p-4">
            <motion.div
              className="aspect-w-1 aspect-h-1 mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {nftImage ? (
                <img
                  src={`https://chronic-sapphire-anaconda.myfilebase.com/ipfs/${nftImage}`}
                  alt="NFT Preview"
                  className="object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400">Mint an NFT to see preview</p>
                </div>
              )}
            </motion.div>
            <h3 className="text-xl font-semibold mb-2">
              {rarity
                ? `${rarity.charAt(0).toUpperCase() + rarity.slice(1)} NFT`
                : "Your NFT"}
            </h3>
            <p className="text-gray-600 mb-4">
              This unique NFT will be minted on the Ethereum blockchain.
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center">
                <Avatar className="w-6 h-6 mr-2">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback>YO</AvatarFallback>
                </Avatar>
                <span>You</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" /> 0
                </span>
                <span className="flex items-center">
                  <Heart className="w-4 h-4 mr-1" /> 0
                </span>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
