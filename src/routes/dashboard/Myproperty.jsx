import React from "react";
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

const Myproperty = () => {
  return (
    <div>
      <Tabs defaultValue="account" className="">
        <TabsList>
          <TabsTrigger value="property">My Properties</TabsTrigger>
          <TabsTrigger value="purchased">Purchased Property</TabsTrigger>
        </TabsList>
        <TabsContent value="property">
          <div className="grid grid-cols-my-property gap-4 border w-full">
            <Rentsample />
            <Rentsample />
            <Rentsample />
          </div>
        </TabsContent>
        <TabsContent value="purchased">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default Myproperty;
