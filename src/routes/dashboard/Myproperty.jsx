import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Rentsample from "../../components/Rentsample";
import { Link } from "react-router-dom";

import { cn, listingContract } from "../../lib/utils";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { resolveMethod } from "thirdweb";

const Myproperty = () => {
  const [activeTab, setActiveTab] = useState("property");

  const account = useActiveAccount();

  const { data, isLoading } = useReadContract({
    contract: listingContract,
    method: resolveMethod("getUserProperties"),
    params: [account && account.address],
  });

  return (
    <div>
      <Tabs defaultValue="property" className="">
        <TabsList className="w-full flex">
          <TabsTrigger
            value="property"
            className={cn(
              "flex-1",
              activeTab == "property"
                ? "bg-btnGrad text-white"
                : "bg-transparent text-black"
            )}
            onClick={() => setActiveTab("property")}
          >
            My Properties
          </TabsTrigger>
          <TabsTrigger
            value="purchased"
            className={cn(
              "flex-1",
              activeTab == "purchased"
                ? "bg-btnGrad text-white"
                : "bg-transparent text-black"
            )}
            onClick={() => setActiveTab("purchased")}
          >
            Purchased Property
          </TabsTrigger>
        </TabsList>
        <TabsContent value="property">
          <div className="grid grid-cols-my-property gap-4  w-full">
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
        <TabsContent value="purchased">
          {" "}
          <div className="grid grid-cols-my-property gap-4 border w-full">
            <Link to={"/property-description"}>
              <Rentsample />
            </Link>
            <Link to={"/property-description"}>
              <Rentsample />
              <Link to={"/property-description"}>
                <Rentsample />
              </Link>
            </Link>
            <Link to={"/property-description"}>
              <Rentsample />
            </Link>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Myproperty;
