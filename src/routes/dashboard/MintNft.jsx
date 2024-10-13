import { useState } from "react";
//import { Button } from "@/components/ui/button";
import { Button } from "../../components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, Heart, Eye, DollarSign } from "lucide-react";
import jwt from "jsonwebtoken";
import { useSelector } from "react-redux";

export default function MintNft() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isMinting, setIsMinting] = useState(false);

  const user = useSelector((state) => state.auth.user);
  //const verified = useSelector((state) => state.auth.isVerified);

  const decodedUser = jwt.decode(user);
  console.log(decodedUser);
  const userAvartar = decodedUser.name.substring(0, 2);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMint = async (e) => {
    e.preventDefault();
    setIsMinting(true);
    // Simulating minting process
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsMinting(false);
    // Reset form after minting
    setName("");
    setDescription("");
    setImage(null);
    setPreviewUrl(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <main className="flex gap-8">
        <Card className="w-2/3 p-6 bg-white rounded-lg shadow-lg">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Create New Item</h1>
            <p className="text-gray-600">
              Mint your unique NFT on the Ethereum blockchain
            </p>
          </div>
          <form onSubmit={handleMint} className="space-y-6">
            <div>
              <Label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Image, Video, Audio, or 3D Model*
              </Label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="image"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  )}
                  <Input
                    id="image"
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                    accept="image/*,video/*,audio/*,.glb,.gltf"
                  />
                </label>
              </div>
            </div>
            <div>
              <Label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Name
              </Label>
              <Input
                id="name"
                placeholder="Item name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
              />
            </div>
            <div>
              <Label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Provide a detailed description of your item"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
              />
            </div>
            <Button
              type="submit"
              disabled={isMinting}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
              {isMinting ? "Minting..." : "Create Item"}
            </Button>
          </form>
        </Card>
        <Card className="w-1/3 p-6 bg-white rounded-lg shadow-lg">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Preview</h2>
            <p className="text-gray-600">
              This is how your item will be displayed
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="aspect-w-1 aspect-h-1 mb-4">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="NFT Preview"
                  className="object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400">No image uploaded</p>
                </div>
              )}
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {name || "Item Name"}
            </h3>
            <p className="text-gray-600 mb-4">
              {description || "Item description will appear here"}
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center">
                <Avatar className="w-6 h-6 mr-2">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback>{userAvartar}</AvatarFallback>
                </Avatar>
                <span>{decodedUser.name}</span>
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
          <Tabs defaultValue="details" className="mt-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="attributes">Attributes</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="py-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Contract Address</span>
                <span className="text-sm">0x1234...5678</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-600">Token ID</span>
                <span className="text-sm">1234</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-600">Token Standard</span>
                <span className="text-sm">ERC-721</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-600">Blockchain</span>
                <span className="text-sm">Ethereum</span>
              </div>
            </TabsContent>
            <TabsContent value="attributes" className="py-4">
              <p className="text-gray-600">No attributes added yet</p>
            </TabsContent>
            <TabsContent value="activity" className="py-4">
              <p className="text-gray-600">No activity yet</p>
            </TabsContent>
          </Tabs>
        </Card>
      </main>
    </div>
  );
}
