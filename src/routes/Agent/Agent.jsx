import React, { useState } from "react";
import Rentsample from "../../components/Rentsample";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import More from "./More";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { resolveMethod } from "thirdweb";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import jwt from "jsonwebtoken";
import { listingContract } from "../../lib/constants";

const Agent = () => {
  const [activeTab, setActiveTab] = useState("property");
  const user = useSelector((state) => state.auth.user);
  //const verified = useSelector((state) => state.auth.isVerified);

  const decodedUser = jwt.decode(user);

  const userAvartar = decodedUser.name.substring(0, 2);

  const { address } = useActiveAccount();

  const { data, isLoading } = useReadContract({
    contract: listingContract,
    method: resolveMethod("getUserProperties"),
    params: [address && address],
  });

  if (isLoading) return <p>Loading.....</p>;

  return (
    <div className="bg-[#37164c] text-white ">
      <div className="md:flex md:justify-center mb-5 ">
        <div className="md:mx-10 mx-3 md:w-4/4">
          <div className="md:h-[80vh h-[60vh ">
            <div className="flex flex-col gap-3 items-center justify-center py-10 md:py-20">
              <div className="flex justify-center">
                <div className="w-20 h-20 flex justify-center items-center mb-2 rounded-full border">
                  <h1 className="text-white font-bold text-2xl text-center">
                    {userAvartar}
                  </h1>
                </div>
              </div>
              <div>
                <p className="font-bold">{decodedUser.name}</p>
                <p>Estate Agent</p>
              </div>
            </div>
            <div className="text-left">
              <p className="flex gap-3 md:text-2xl items-center">
                Account Verification Status:{" "}
                <span className="font-bold py-1 px-4 bg-green-200 text-green-400 rounded-md ">
                  {" "}
                  Verified{" "}
                </span>
              </p>
              <p className="flex gap-3 md:text-2xl mb-10">
                Email:
                <span className="font-bold">{decodedUser.email}</span>
              </p>
            </div>
          </div>

          <div>
            <Tabs defaultValue="Property Listed" className="">
              <TabsList className="md:w-full flex gap-1 md:gap-3 ">
                <TabsTrigger
                  value="Property Listed"
                  className={cn(
                    "flex-1 md:font-bold text-[13px] md:text-[17px]",
                    activeTab == "Property Listed"
                      ? "bg-[#964CC3] text-white"
                      : "bg-white text-[#964CC3]"
                  )}
                  onClick={() => setActiveTab("Property Listed")}
                >
                  Properties Listed
                </TabsTrigger>

                {/* <TabsTrigger
                  value="Closed Deals"
                  className={cn(
                    "flex-1 md:font-bold text-[13px] md:text-[17px]",
                    activeTab == "Closed Deals"
                      ? "bg-[#964CC3] text-white"
                      : "bg-white text-[#964CC3]"
                  )}
                  onClick={() => setActiveTab("Closed Deals")}
                >
                  Closed Deals
                </TabsTrigger> */}
              </TabsList>
              <div>
                {/* <TabsContent value="Assets">
                  <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-4 flex-1 w-full">
                    <More />
                    <More />
                    <More />
                  </div>
                </TabsContent> */}
                <TabsContent value="Property Listed">
                  {" "}
                  <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-4 flex-1 w-full">
                    {data?.map((item, i) => (
                      <Link
                        to={`/home/property-description/${item.propertyId}`}
                        key={i}
                      >
                        <Rentsample data={item} />
                      </Link>
                    ))}
                  </div>
                </TabsContent>

                {/* <TabsContent value="Closed Deals">
                  <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-4 flex-1 w-full">
                    <More />
                    <More />
                    <More />
                    <More />
                    <More />
                  </div>
                </TabsContent> */}
              </div>
            </Tabs>
          </div>
        </div>
      </div>
      <div className="bg-agentFooter p-10 mx-10">
        <div className=" md:w-2/3 mb-3 text-justify md:mb-10">
          <p className="md:text-2xl py-4 font-bold text-xl ">About Agent</p>
          <p className="md:text-xl text-[13px]">
            I am a passionate and trustworthy person, i work as a computer
            engineer at watchman technology limited i rent houses and also act
            as a real estate agent. You can contact for your house renting and
            property buying.
          </p>
        </div>
        <div className="md:flex md:justify-between grid gap-3  items-center">
          <div className="flex gap-5 items-center">
            <img src="/images/adams.svg" className="md:h-[8rem] h-10" alt="" />
            <div>
              <p className="md:text-2xl md:py-3 font-bold text-[13px]">
                Adams Cane
              </p>
              <p className="text-[10px] md:text-xl">Estate Agent</p>
            </div>
          </div>

          <div className="flex md:gap-7 gap-3">
            <Button variant="rent" size="footer">
              Call Lister
            </Button>

            <Button variant="rent" size="footer" md:size="property">
              Message Lister
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agent;
