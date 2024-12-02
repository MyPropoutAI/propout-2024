import { useState } from "react";
import { useSelector } from "react-redux";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { resolveMethod } from "thirdweb";
import jwt from "jsonwebtoken";
import { toast } from "sonner";
import Link from "next/link";
import { FidgetSpinner } from "react-loader-spinner";
import {
  Edit,
  ToggleLeft,
  ToggleRight,
  DollarSign,
  Trash2,
  MoreHorizontal,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import { listingContract } from "@/lib/constants";
import { usePropertyDetails } from "@/contexts/hooks/useGetOneUserProperties";
import { UseDeleteProperty } from "@/contexts/hooks/useDeleteProperty";
import CurrencySymbol from "@/lib/CurrencySymbol";

const MyProperties = () => {
  const [activeTab, setActiveTab] = useState("property");
  const user = useSelector((state) => state.auth.user);
  const decodedUser = jwt.decode(user);
  const account = useActiveAccount();

  const {
    handleDeleteProperty,
    loading: deleteLoading,
    isSuccess: deleteSuccess,
    error: deletePropertyError,
  } = UseDeleteProperty();

  const { data: purchasedProperties } = useReadContract({
    contract: listingContract,
    method: resolveMethod("getUserProperties"),
    params: [account && account.address],
  });

  const {
    data: safeProperty,
    isLoading,
    isError,
    error,
    refetch,
  } = usePropertyDetails(decodedUser?.id);

  const handleDelete = (propertyId) => {
    handleDeleteProperty({ propertyId, userid: decodedUser.id });

    if (deleteSuccess) {
      toast.success("Property deleted successfully!");
    } else if (deletePropertyError) {
      toast.error("Error deleting property", {
        description: deletePropertyError.message,
      });
    }
  };

  const handleEdit = (propertyId) => {
    // Implement edit functionality
    console.log("Editing property:", propertyId);
    toast.info("Edit functionality not implemented yet");
  };

  const handleGenerateFlyer = (propertyId) => {
    // Implement generate flyer functionality
  };

  const handleToggleStatus = (propertyId) => {
    // Implement toggle status functionality
    console.log("Toggling status for property:", propertyId);
    toast.info("Toggle status functionality not implemented yet");
  };

  const handleMarkAsSold = (propertyId) => {
    // Implement mark as sold functionality
    console.log("Marking property as sold:", propertyId);
    toast.info("Mark as sold functionality not implemented yet");
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <FidgetSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="flex flex-col gap-5">
          <div className="text-red-500 flex flex-col gap-5">
            Error: {error.message}
            <Button
              onClick={() => refetch()}
              className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const PropertyActionsDropdown = ({ property }) => (
    <DropdownMenu className="bg-white">
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => handleEdit(property.id)}>
          <Edit className="mr-2 h-4 w-4" />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleGenerateFlyer(property.id)}>
          <Edit className="mr-2 h-4 w-4" />
          <span>Generate Flyer</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleToggleStatus(property.id)}>
          {property.status === "Disabled" ? (
            <ToggleLeft className="mr-2 h-4 w-4" />
          ) : (
            <ToggleRight className="mr-2 h-4 w-4" />
          )}
          <span>Toggle status</span>
        </DropdownMenuItem>
        {property.status !== "Sold" && (
          <DropdownMenuItem onClick={() => handleMarkAsSold(property.id)}>
            <DollarSign className="mr-2 h-4 w-4" />
            <span>Mark as sold</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleDelete(property.id)}
          disabled={deleteLoading}
          className="text-red-600 focus:text-red-600"
        >
          {deleteLoading ? (
            "Deleting..."
          ) : (
            <>
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs defaultValue="property" className="w-full">
        <TabsList className="w-full flex mb-8">
          <TabsTrigger
            value="property"
            className={cn(
              "flex-1",
              activeTab === "property"
                ? "bg-primary text-primary-foreground"
                : "bg-background text-foreground"
            )}
            onClick={() => setActiveTab("property")}
          >
            My Listings
          </TabsTrigger>
          <TabsTrigger
            value="purchased"
            className={cn(
              "flex-1",
              activeTab === "purchased"
                ? "bg-primary text-primary-foreground"
                : "bg-background text-foreground"
            )}
            onClick={() => setActiveTab("purchased")}
          >
            Property
          </TabsTrigger>
        </TabsList>
        <TabsContent value="property">
          {/* <div className="bg-background shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h1 className="text-3xl font-bold text-foreground mb-6">
                My Properties
              </h1>
              <ul className="divide-y divide-border">
                {safeProperty?.data.listing.map((property) => (
                  <li key={property.id} className="py-6">
                    <div className="flex items-center justify-between flex-wrap sm:flex-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-16 w-16 mr-4">
                          <img
                            src={property.img_urls?.split(", ")[0]}
                            alt={property.headline}
                            className="rounded-lg object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          <h2 className="text-lg font-medium text-foreground">
                            {property.headline}
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            {property.address}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                        <span className="text-lg font-medium text-foreground">
                          <CurrencySymbol
                            amount={Number(property.property_price)}
                            listType={property.list_type.toLocaleUpperCase()}
                          />
                        </span>
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            property.status
                          )}`}
                        >
                          {property.status}
                        </span>
                        <PropertyActionsDropdown property={property} />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div> */}
          <div className="bg-background shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h1 className="text-3xl font-bold text-foreground mb-6">
                My Properties
              </h1>
              <table className="min-w-full divide-y divide-border">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-foreground">
                      Property
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-foreground">
                      Address
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-foreground">
                      Price
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-foreground">
                      Status
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {safeProperty?.data.listing.map((property) => (
                    <tr key={property.id} className="hover:bg-gray-100">
                      <td className="px-4 py-2">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-16 w-16 mr-4">
                            <img
                              src={property.img_urls?.split(", ")[0]}
                              alt={property.headline}
                              className="rounded-lg object-cover w-full h-full"
                            />
                          </div>
                          <span className="text-lg font-medium text-foreground">
                            {property.headline}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-sm text-muted-foreground">
                        {property.address}
                      </td>
                      <td className="px-4 py-2 text-lg font-medium text-foreground">
                        <CurrencySymbol
                          amount={Number(property.property_price)}
                          listType={property.list_type.toLocaleUpperCase()}
                        />
                      </td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            property.status
                          )}`}
                        >
                          {property.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <PropertyActionsDropdown property={property} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="purchased">
          <div className="bg-background shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h1 className="text-3xl font-bold text-foreground mb-6">
                Purchased Properties
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {purchasedProperties?.map((item, i) => (
                  <Link
                    href={`/property-description/${item.propertyId}`}
                    key={i}
                    className="block"
                  >
                    <div className="bg-card text-card-foreground rounded-lg shadow-md overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name || "Property"}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">
                          {item.name || "Property Name"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.description || "No description available"}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyProperties;
