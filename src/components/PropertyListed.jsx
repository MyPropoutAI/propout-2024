import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BedDouble, Castle, MapPin, Search, Square } from "lucide-react";
import { useGetProperties } from "../contexts/hooks/useProperty";
import CurrencySymbol from "../lib/CurrencySymbol";
import { cn } from "../lib/utils";
import { FidgetSpinner } from "react-loader-spinner";
import { Link } from "react-router-dom";
export default function PropertyListing() {
  const [searchTerm, setSearchTerm] = useState("");

  const { properties, loading } = useGetProperties();
  const listedProperties = Array.isArray(properties?.listing)
    ? properties.listing
    : properties?.listing
    ? [properties.listing]
    : [];

  const filteredProperties = listedProperties.filter((property) => {
    const title = property.title?.toLowerCase() || ""; // Safe access
    const location = property.location?.toLowerCase() || ""; // Safe access
    return (
      title.includes(searchTerm.toLowerCase()) ||
      location.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Properties
        </h2>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {filteredProperties.map((property, index) => (
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
                    src={property.img_urls?.split(", ")[0]}
                    alt={property.headline}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1">
                      {property.headline}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2 flex gap-2 items-center">
                      <MapPin className="text-red-500 w-8 h-8" />
                      {property.address}
                    </p>
                    <span className="inline-block px-2 py-1 text-xs font-semibold bg-gray-200 rounded-full mb-2">
                      {property.type}
                    </span>
                    <p className="text-lg font-bold mb-4">
                      <CurrencySymbol
                        amount={Number(property?.property_price)}
                        listType={property.list_type?.toLocaleUpperCase()}
                      />
                    </p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span className="flex items-center">
                        <BedDouble className="mr-1 h-4 w-4" />
                        {property.room_spec} bd
                      </span>
                      <span className="flex items-center">
                        <Castle className="mr-1 h-4 w-4" />
                        {property.city}
                      </span>
                      <span className="flex items-center">
                        <Square className="mr-1 h-4 w-4" />
                        {property.square_ft} sqft
                      </span>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50">
                    <Link to={`/property/${property.id}`}>
                      <button className="w-full px-4 py-2 bg-gradient-to-br from-purple-700 to-indigo-900 hover:bg-purple-700 text-white rounded-md">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
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
              View More Properties
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
