import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Rentsample from "../../components/Rentsample";
import { Link } from "react-router-dom";

import { cn } from "../../lib/utils";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { resolveMethod } from "thirdweb";
import { listingContract } from "../../lib/constants";
import {
  Edit,
  ToggleLeft,
  ToggleRight,
  DollarSign,
  Trash2,
} from "lucide-react";

const properties = [
  {
    id: 1,
    image: "/placeholder.svg",
    title: "Modern Apartment",
    address: "123 Main St, New York, NY",
    price: 500000,
    status: "Active",
  },
  {
    id: 2,
    image: "/placeholder.svg",
    title: "Cozy Cottage",
    address: "456 Oak Ave, San Francisco, CA",
    price: 750000,
    status: "Pending",
  },
  {
    id: 3,
    image: "/placeholder.svg",
    title: "Luxury Villa",
    address: "789 Palm Rd, Miami, FL",
    price: 2000000,
    status: "Sold",
  },
  {
    id: 4,
    image: "/placeholder.svg",
    title: "City Loft",
    address: "101 Downtown Blvd, Chicago, IL",
    price: 350000,
    status: "Disabled",
  },
];

const Myproperty = () => {
  const [activeTab, setActiveTab] = useState("property");

  const account = useActiveAccount();

  const { data } = useReadContract({
    contract: listingContract,
    method: resolveMethod("getUserProperties"),
    params: [account && account.address],
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Sold":
        return "bg-blue-100 text-blue-800";
      case "Disabled":
        return "bg-gray-100 text-gray-800";
    }
  };

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
          <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                My Properties
              </h1>
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <ul className="divide-y divide-gray-200">
                  {properties.map((property) => (
                    <li key={property.id} className="p-4 sm:p-6">
                      <div className="flex items-center justify-between flex-wrap sm:flex-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-16 w-16 mr-4">
                            <img
                              src={property.image}
                              alt={property.title}
                              className="rounded-lg object-cover"
                            />
                          </div>
                          <div>
                            <h2 className="text-lg font-medium text-gray-900">
                              {property.title}
                            </h2>
                            <p className="text-sm text-gray-500">
                              {property.address}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                          <span className="text-lg font-medium text-gray-900">
                            ${property.price.toLocaleString()}
                          </span>
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                              property.status
                            )}`}
                          >
                            {property.status}
                          </span>
                          <button className="text-indigo-600 hover:text-indigo-900">
                            <Edit className="h-5 w-5" />
                            <span className="sr-only">Edit</span>
                          </button>
                          <button className="text-gray-400 hover:text-gray-500">
                            {property.status === "Disabled" ? (
                              <ToggleLeft className="h-6 w-6" />
                            ) : (
                              <ToggleRight className="h-6 w-6" />
                            )}
                            <span className="sr-only">Toggle status</span>
                          </button>
                          {property.status !== "Sold" && (
                            <button className="text-green-600 hover:text-green-900">
                              <DollarSign className="h-5 w-5" />
                              <span className="sr-only">Mark as sold</span>
                            </button>
                          )}
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-5 w-5" />
                            <span className="sr-only">Delete</span>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="purchased">
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
      </Tabs>
    </div>
  );
};

export default Myproperty;
