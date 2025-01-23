"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BedDouble, Castle, MapPin, Search, Square } from "lucide-react";
import { useGetProperties } from "../contexts/hooks/useProperty";
import CurrencySymbol from "../lib/CurrencySymbol";
import { cn } from "../lib/utils";
import { FidgetSpinner } from "react-loader-spinner";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import jwt from "jsonwebtoken";
// import useLikeProperty from "../contexts/hooks/useLikeProperty";
// Assume we have a user context or auth service
// import { useUser } from "../contexts/UserContext";

export default function PropertyListing() {
  const [searchTerm, setSearchTerm] = useState("");
  // const [likedProperties, setLikedProperties] = useState({});

  // const { likeMutation } = useLikeProperty();

  // const user = useSelector((state) => state.auth?.user);
  // const decodedUser = jwt.decode(user);
  // const userId = decodedUser?.id;

  const { properties, loading } = useGetProperties();
  // Assume this hook provides the current user

  const listedProperties = Array.isArray(properties?.listing)
    ? properties.listing
    : properties?.listing
    ? [properties.listing]
    : [];

  const filteredProperties = listedProperties.filter((property) => {
    const title = property.title?.toLowerCase() || "";
    const location = property.location?.toLowerCase() || "";
    return (
      title.includes(searchTerm.toLowerCase()) ||
      location.includes(searchTerm.toLowerCase())
    );
  });

  // Show only first 6 properties
  const displayedProperties = filteredProperties.slice(0, 8);

  // useEffect(() => {
  // Initialize liked properties from API or local storage
  // This is a placeholder and should be replaced with actual data fetching
  //   const initialLikes = displayedProperties.reduce((acc, property) => {
  //     acc[property.id] = property.likes || 0;
  //     return acc;
  //   }, {});
  //   setLikedProperties(initialLikes);
  // }, [displayedProperties]);

  // const handleLike = async (propertyId) => {
  //   if (!user) {
  //     console.log("Please log in to like properties");
  //     return;
  //   }

  //   setLikedProperties((prev) => ({
  //     ...prev,
  //     [propertyId]: (prev[propertyId] || 0) + 1,
  //   }));

  //   try {
  //     const response = await likeMutation.mutateAsync({ userId, propertyId });

  //     if (!response.ok) {
  //       throw new Error("Failed to like property");
  //     }
  //   } catch (error) {
  //     //console.error("Error liking property:", error);
  //     setLikedProperties((prev) => ({
  //       ...prev,
  //       [propertyId]: (prev[propertyId] || 1) - 1,
  //     }));
  //   }
  // };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-2 ">
            Featured Properties
          </h2>
          <p className="text-gray-500 text-center">
            Explore Our Featured Properties
          </p>
        </div>
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-md">
            <Input
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        {loading ? (
          <div className="w-full flex items-center justify-center">
            <FidgetSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
            {displayedProperties.map((property, index) => (
              <Link key={property.id || index} to={`/property/${property.id}`}>
                <motion.div
                  key={property.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
                    <span
                      className={cn(
                        "absolute py-2 px-5 top-0 right-0 bg-[#0EFC25] text-white font-semibold",
                        property.list_type === "Sell"
                          ? "bg-blue-900"
                          : "bg-[#0EFC25]"
                      )}
                    >
                      {property.list_type.toLocaleUpperCase()}
                    </span>
                    <img
                      src={
                        property.img_urls?.split(", ")[0] || "/placeholder.svg"
                      }
                      alt={property.headline}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-1 truncate">
                        {property.headline}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2 flex gap-2 items-center">
                        <MapPin className="text-red-500 w-4 md:w-8 h-4 md:h-8 flex-shrink-0" />
                        <span className="truncate">{property.address}</span>
                      </p>
                      <span className="inline-block px-2 py-1 text-xs font-semibold bg-gray-200 rounded-full mb-2 truncate max-w-full">
                        {property.type}
                      </span>
                      <p className="text-lg font-bold mb-4">
                        <CurrencySymbol
                          amount={Number(property?.property_price)}
                          listType={property.list_type?.toLocaleUpperCase()}
                        />
                      </p>
                      <div className="hidden md:flex justify-between text-sm text-gray-500">
                        <span className="flex items-center truncate">
                          <BedDouble className="mr-1 h-4 w-4 flex-shrink-0" />
                          <span className="truncate">
                            {property.room_spec} bd
                          </span>
                        </span>
                        <span className="flex items-center truncate">
                          <Castle className="mr-1 h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{property.city}</span>
                        </span>
                        <span className="flex items-center truncate">
                          <Square className="mr-1 h-4 w-4 flex-shrink-0" />
                          <span className="truncate">
                            {property.square_ft} sqft
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="hidden px-4 py-3 bg-gray-50 lg:flex justify-between items-center">
                      <Link to={`/property/${property.id}`}>
                        <button className="px-4 py-2 bg-gradient-to-br from-purple-700 to-indigo-900 hover:bg-purple-700 text-white rounded-md">
                          View Details
                        </button>
                      </Link>
                      {/* <button
                        onClick={() => handleLike(property.id)}
                        className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors duration-200"
                      >
                        <Heart
                          className={cn(
                            "h-5 w-5",
                            likedProperties[property.id] > 0 &&
                              "fill-current text-red-500"
                          )}
                        />
                        <span>{likedProperties[property.id] || 0}</span>
                      </button> */}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
        <div className="text-center">
          <Link to="/marketplace">
            <Button
              variant="link"
              size="lg"
              className="bg-gradient-to-br from-purple-700 to-indigo-900 hover:bg-purple-700 text-white"
            >
              View All Properties
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
