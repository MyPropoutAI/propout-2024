import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Home, ListChecks, Key, DollarSign } from "lucide-react";
import { useSelector } from "react-redux";
import { usePropertyDetails } from "@/contexts/hooks/useGetOneUserProperties";
//import { UseDeleteProperty } from "@/contexts/hooks/useDeleteProperty";
//import CurrencySymbol from "@/lib/CurrencySymbol";
import { Button } from "./ui/button";
import jwt from "jsonwebtoken";
import { FidgetSpinner } from "react-loader-spinner";
const StatItem = ({ title, value, icon, color }) => (
  <div className="flex items-center space-x-2">
    <div className={`p-2 rounded-full ${color}`}>{icon}</div>
    <div>
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <h4 className="text-2xl font-bold">{value}</h4>
    </div>
  </div>
);

export function PropertyStatsCard() {
  const user = useSelector((state) => state.auth.user);
  const decodedUser = jwt.decode(user);
  const {
    data: safeProperty,
    isLoading,
    isError,
    error,
    refetch,
  } = usePropertyDetails(decodedUser?.id);

  //console.log("properties", safeProperty.data.listing.length);
  const properties = safeProperty?.data?.listing;
  //console.log(properties);
  const rentedProperties = properties?.filter(
    (property) => property.list_type.toLowerCase() === "rent"
  );

  const propertiesForSell = properties?.filter(
    (property) => property.list_type.toLowerCase() === "sell"
  );

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

  const stats = [
    {
      title: "Total Properties",
      value: properties?.length,
      icon: <Home className="w-4 h-4" />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Properties For Sell",
      value: propertiesForSell?.length,
      icon: <ListChecks className="w-4 h-4" />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Properties For Rent",
      value: rentedProperties?.length,
      icon: <Key className="w-4 h-4" />,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Total Revenue",
      value: "₦00,000",
      icon: <DollarSign className="w-4 h-4" />,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Property Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat, index) => (
              <StatItem key={index} {...stat} />
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
