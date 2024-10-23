import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Heart } from "lucide-react";

export default function AdvancedNFTMinting() {
  const [nftImage, setNftImage] = useState(null);
  const [rarity, setRarity] = useState("");
  const [isMinting, setIsMinting] = useState(false);
  const [tokenId, setTokenId] = useState("");
  const [nftDetails, setNftDetails] = useState(null);

  const generateNFT = async (selectedRarity) => {
    setIsMinting(true);
    // Simulating NFT generation based on rarity
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // For demonstration, we're using placeholder images
    const images = {
      common: "/placeholder.svg?height=400&width=400&text=Common+NFT",
      uncommon: "/placeholder.svg?height=400&width=400&text=Uncommon+NFT",
      rare: "/placeholder.svg?height=400&width=400&text=Rare+NFT",
      mythic: "/placeholder.svg?height=400&width=400&text=Mythic+NFT",
    };
    setNftImage(images[selectedRarity]);
    setIsMinting(false);
  };

  const handleMint = () => {
    if (rarity) {
      generateNFT(rarity);
    }
  };

  const fetchNFTDetails = async (id) => {
    // Simulating API call to fetch NFT details
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setNftDetails({
      id: id,
      name: `NFT #${id}`,
      rarity: ["Common", "Uncommon", "Rare", "Mythic"][
        Math.floor(Math.random() * 4)
      ],
      owner: "0x1234...5678",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br  p-8">
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
                  <SelectItem value="mythic">Native</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleMint}
              disabled={isMinting || !rarity}
              className="w-full bg-gradient-to-br from-purple-700 to-indigo-900 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
              {isMinting ? "Minting..." : "Mint NFT"}
            </Button>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">NFT Details Lookup</h2>
            <div className="flex space-x-4">
              <Input
                placeholder="Enter NFT Token ID"
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
              />
              <Button onClick={() => fetchNFTDetails(tokenId)}>
                Fetch Details
              </Button>
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
                  src={nftImage}
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
