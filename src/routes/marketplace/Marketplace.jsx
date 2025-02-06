import { useState, useEffect } from "react";
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
import { PropertyType } from "../../lib/PropertyType";

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

  // Filter properties based on all criteria
  const filteredProperties = listedProperties.filter((property) => {
    // Search term filter (check headline, address, city)
    const searchMatch =
      searchTerm === "" ||
      property.headline?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.city?.toLowerCase().includes(searchTerm.toLowerCase());

    // Price range filter
    const priceMatch =
      Number(property.property_price) >= priceRange[0] &&
      Number(property.property_price) <= priceRange[1];

    // Property type filter
    const typeMatch =
      propertyType === "Any" ||
      property.type?.toLowerCase() === propertyType.toLowerCase();

    // Bedrooms filter
    const bedroomMatch =
      bedrooms === 0 || Number(property.room_spec) >= bedrooms;

    return searchMatch && priceMatch && typeMatch && bedroomMatch;
  });

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, priceRange, propertyType, bedrooms]);

  // Get maximum price for range input
  const maxPrice = Math.max(
    ...listedProperties.map((p) => Number(p.property_price))
  );

  // Update price range max based on available properties
  useEffect(() => {
    if (maxPrice > 0) {
      setPriceRange([0, maxPrice]);
    }
  }, [maxPrice]);

  // Pagination logic
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
  };

  // Reset all filters
  const resetFilters = () => {
    setPriceRange([0, maxPrice]);
    setPropertyType("Any");
    setBedrooms(0);
    setSearchTerm("");
    setCurrentPage(1);
  };

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
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Filters</h2>
                    <button
                      onClick={resetFilters}
                      className="text-sm text-purple-600 hover:text-purple-800"
                    >
                      Reset All
                    </button>
                  </div>
                  <form className="space-y-4">
                    {/* Price Range Filter */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">
                        Price Range (₦)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={priceRange[0]}
                          onChange={(e) =>
                            setPriceRange([
                              Number(e.target.value),
                              priceRange[1],
                            ])
                          }
                          className="w-1/2 p-2 border rounded-md"
                        />
                        <span>to</span>
                        <input
                          type="number"
                          value={priceRange[1]}
                          onChange={(e) =>
                            setPriceRange([
                              priceRange[0],
                              Number(e.target.value),
                            ])
                          }
                          className="w-1/2 p-2 border rounded-md"
                        />
                      </div>
                    </div>

                    {/* Property Type Filter */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">
                        Property Type
                      </label>
                      <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="1" hidden>
                          List Type
                        </option>
                        {PropertyType.map((type, i) => (
                          <option key={i} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Bedrooms Filter */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">
                        Bedrooms
                      </label>
                      <select
                        value={bedrooms}
                        onChange={(e) => setBedrooms(Number(e.target.value))}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value={0}>Any</option>
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num}+ Beds
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
                  <form onSubmit={handleSearch} className="flex space-x-2">
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
                  </form>
                </div>

                {/* Results Summary */}
                <div className="mb-4 text-sm text-gray-600">
                  Found {filteredProperties.length} properties
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
                      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {currentProperties.map((property, index) => (
                          <Link
                            to={`/property/${property.id}`}
                            key={property.id || index}
                            className="block"
                          >
                            <div className="relative bg-white rounded-lg shadow-md overflow-hidden h-full">
                              <span
                                className={cn(
                                  "absolute py-1 md:py-2 px-2 md:px-5 top-0 right-0 text-xs md:text-sm bg-[#0EFC25] text-white font-semibold z-10",
                                  property.list_type === "Sell"
                                    ? "bg-blue-900"
                                    : "bg-[#0EFC25]"
                                )}
                              >
                                {property.list_type.toLocaleUpperCase()}
                              </span>
                              <div className="relative w-full h-32 md:h-48">
                                {property.mediaType === "video" ? (
                                  <video
                                    src={property.img_urls?.split(", ")[0]}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    controls
                                    playsInline
                                    controlsList="nodownload"
                                    disablePictureInPicture
                                    onContextMenu={(e) => e.preventDefault()}
                                  >
                                    Your browser does not support the video tag.
                                  </video>
                                ) : (
                                  <img
                                    src={property.img_urls?.split(", ")[0]}
                                    alt={property.headline}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    onError={(e) => {
                                      e.target.src = "/placeholder.svg";
                                    }}
                                  />
                                )}
                              </div>
                              <div className="p-2 md:p-4">
                                <h3 className="text-sm md:text-lg font-semibold mb-1 truncate">
                                  {property.headline}
                                </h3>
                                <p className="text-xs md:text-sm text-gray-500 mb-2 flex gap-1 md:gap-2 items-center">
                                  <MapPin className="text-red-500 w-4 md:w-8 h-4 md:h-8 flex-shrink-0" />
                                  <span className="truncate">
                                    {property.address}
                                  </span>
                                </p>
                                <span className="inline-block px-2 py-1 text-xs font-semibold bg-gray-200 rounded-full mb-2 truncate max-w-full">
                                  {property.type}
                                </span>
                                <p className="text-sm md:text-lg font-bold mb-2 md:mb-4">
                                  <CurrencySymbol
                                    amount={Number(property.property_price)}
                                    listType={property.list_type.toLocaleUpperCase()}
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
                                    <span className="truncate">
                                      {property.city}
                                    </span>
                                  </span>
                                  <span className="flex items-center truncate">
                                    <Square className="mr-1 h-4 w-4 flex-shrink-0" />
                                    <span className="truncate">
                                      {property.square_ft} sqft
                                    </span>
                                  </span>
                                </div>
                                {/* Mobile specs - simplified version */}
                                <div className="flex md:hidden justify-between text-xs text-gray-500 mt-2">
                                  <span className="flex items-center">
                                    <BedDouble className="mr-1 h-3 w-3" />
                                    {property.room_spec}
                                  </span>
                                  <span className="flex items-center">
                                    <Square className="mr-1 h-3 w-3" />
                                    {property.square_ft}
                                  </span>
                                </div>
                              </div>
                              {/* View Details button - hidden on mobile */}
                              <div className="hidden md:block px-4 py-3 bg-gray-50">
                                <button className="w-full px-4 py-2 bg-gradient-to-br from-purple-700 to-indigo-900 hover:bg-purple-700 text-white rounded-md">
                                  View Details
                                </button>
                              </div>
                            </div>
                          </Link>
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
