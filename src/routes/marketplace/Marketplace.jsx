import { useState } from "react";
import {
  BedDouble,
  Square,
  Search,
  SlidersHorizontal,
  X,
  MapPin,
  Castle,
} from "lucide-react";
import { useGetProperties } from "../../contexts/hooks/useProperty";
import { FidgetSpinner } from "react-loader-spinner";
import CurrencySymbol from "../../lib/CurrencySymbol";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

export default function MarketplacePage() {
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("Any");
  const [bedrooms, setBedrooms] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 9;

  const { properties, loading } = useGetProperties();
  const listedProperties = Array.isArray(properties?.listing)
    ? properties.listing
    : properties?.listing
    ? [properties.listing]
    : [];

  //console.log("Listing properties:", listedProperties);

  const filteredProperties = listedProperties;
  //console.log("Filtered properties:", filteredProperties);

  // Pagination logic
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Filters Section */}
              <div
                className={`w-full md:w-1/4 ${
                  showFilters ? "block" : "hidden md:block"
                }`}
              >
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-bold mb-4">Filters</h2>
                  <form className="space-y-4">
                    {/* Price Range Filter */}
                    <div className="space-y-2">
                      <label
                        htmlFor="price-range"
                        className="block text-sm font-medium"
                      >
                        Price Range
                      </label>
                      <input
                        type="range"
                        id="price-range"
                        min="0"
                        max="1000000"
                        step="10000"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([0, parseInt(e.target.value)])
                        }
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>₦0</span>
                        <span>₦{priceRange[1].toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Property Type Filter */}
                    <div className="space-y-2">
                      <label
                        htmlFor="property-type"
                        className="block text-sm font-medium"
                      >
                        Property Type
                      </label>
                      <select
                        id="property-type"
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="Any">Any</option>
                        <option value="home">Home</option>
                        <option value="school">School</option>
                        <option value="office">Office</option>
                        <option value="apartment">Apartment</option>
                        <option value="condo">Condo</option>
                        <option value="industrial">Industrial</option>
                        <option value="retail">Retail</option>
                        <option value="hospitality">Hospitality</option>
                        <option value="land">Land</option>
                        <option value="garage">Garage</option>
                        <option value="commercial">Commercial</option>
                      </select>
                    </div>

                    {/* Bedrooms Filter */}
                    <div className="space-y-2">
                      <label
                        htmlFor="bedrooms"
                        className="block text-sm font-medium"
                      >
                        Bedrooms
                      </label>
                      <select
                        id="bedrooms"
                        value={bedrooms}
                        onChange={(e) => setBedrooms(parseInt(e.target.value))}
                        className="w-full p-2 border rounded-md"
                      >
                        {[0, 1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num}+
                          </option>
                        ))}
                      </select>
                    </div>
                  </form>
                </div>
              </div>

              {/* Main Content */}
              <div className="w-full md:w-3/4">
                {/* Search Bar */}
                <div className="mb-6">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Search by location, property name, or address"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1 p-2 border rounded-md"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-purple-600 text-white rounded-md flex items-center"
                    >
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </button>
                    <button
                      type="button"
                      className="md:hidden px-4 py-2 border rounded-md"
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      {showFilters ? (
                        <X className="h-4 w-4" />
                      ) : (
                        <SlidersHorizontal className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Properties Grid */}
                {loading ? (
                  <div className="w-full flex items-center justify-center">
                    <FidgetSpinner />
                  </div>
                ) : (
                  <>
                    {currentProperties.length === 0 ? (
                      <div className="text-center py-10 text-gray-500">
                        No properties found matching your search criteria.
                      </div>
                    ) : (
                      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {currentProperties.map((property, index) => (
                          <div
                            key={property.id || index}
                            className="relative bg-white rounded-lg shadow-md overflow-hidden"
                          >
                            <span
                              className={cn(
                                "absolute py-2 px-5 top- 0 right-0 bg-[#0EFC25] text-white font-semibold",
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
                                  amount={Number(property.property_price)}
                                  listType={property.list_type.toLocaleUpperCase()}
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
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* Pagination */}
                <div className="flex justify-center mt-6">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={`mx-1 px-3 py-1 rounded-md ${
                        currentPage === index + 1
                          ? "bg-purple-600 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
