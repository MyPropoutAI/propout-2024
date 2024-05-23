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

import { cn } from "../../lib/utils";

const Myproperty = () => {
  const [activeTab, setActiveTab] = useState("property");

  // const style = {
  //   backgroundColor: activeTab ? "black" : "white",
  //   color: activeTab ? "white" : "black",
  // };

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
            <Link to={"/property-description"}>
              <Rentsample />
            </Link>
            <Rentsample />
            <Rentsample />
          </div>
        </TabsContent>
        <TabsContent value="purchased">
          {" "}
          <div className="grid grid-cols-my-property gap-4 border w-full">
            <Link to={"/property-description"}>
              <Rentsample />
            </Link>
            <Rentsample />
            <Rentsample />
            <Rentsample />
            <Rentsample />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Myproperty;
