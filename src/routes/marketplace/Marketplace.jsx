//import * as React from "react";
import { useState } from "react";
import {
  //Building,
  BedDouble,
  Bath,
  Square,
  //MapPin,
  Search,
  SlidersHorizontal,
  X,
  //ChevronDown,
} from "lucide-react";

// Mock data for properties
const properties = [
  {
    id: 1,
    title: "Modern Apartment in Downtown",
    type: "Apartment",
    price: 250000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1000,
    address: "123 Main St, Anytown, USA",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Spacious Family Home",
    type: "House",
    price: 450000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2500,
    address: "456 Oak Ave, Someplace, USA",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    title: "Cozy Studio Near University",
    type: "Studio",
    price: 150000,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 500,
    address: "789 College Blvd, Collegetown, USA",
    image: "/placeholder.svg",
  },
  // Add more properties as needed
];

export default function MarketplacePage() {
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("Any");
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [petFriendly, setPetFriendly] = useState(false);
  const [activeTab, setActiveTab] = useState("list");

  const filteredProperties = properties.filter((property) => {
    return (
      property.price >= priceRange[0] &&
      property.price <= priceRange[1] &&
      (propertyType === "Any" || property.type === propertyType) &&
      property.bedrooms >= bedrooms &&
      property.bathrooms >= bathrooms &&
      (searchTerm === "" ||
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="#">
          <Building className="h-6 w-6 mr-2" />
          <span className="font-bold">Real Estate Marketplace</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Buy
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Rent
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Sell
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            My Account
          </Link>
        </nav>
      </header> */}
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
                        <span>$0</span>
                        <span>${priceRange[1].toLocaleString()}</span>
                      </div>
                    </div>
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
                        <option value="House">House</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Studio">Studio</option>
                      </select>
                    </div>
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
                    <div className="space-y-2">
                      <label
                        htmlFor="bathrooms"
                        className="block text-sm font-medium"
                      >
                        Bathrooms
                      </label>
                      <select
                        id="bathrooms"
                        value={bathrooms}
                        onChange={(e) => setBathrooms(parseInt(e.target.value))}
                        className="w-full p-2 border rounded-md"
                      >
                        {[0, 1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num}+
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="pet-friendly"
                        checked={petFriendly}
                        onChange={(e) => setPetFriendly(e.target.checked)}
                        className="rounded"
                      />
                      <label
                        htmlFor="pet-friendly"
                        className="text-sm font-medium"
                      >
                        Pet Friendly
                      </label>
                    </div>
                  </form>
                </div>
              </div>
              {/* Main Content */}
              <div className="w-full md:w-3/4">
                {/* Search Bar */}
                <div className="mb-6">
                  <form className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Search by location, property name, or address"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1 p-2 border rounded-md"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-br from-purple-700 to-indigo -900 hover:bg-purple-700 text-white rounded-md flex items-center"
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
                {/* Tabs for List and Map Views */}
                <div className="mb-6">
                  <div className="flex border-b">
                    <button
                      className={`px-4 py-2 ${
                        activeTab === "list"
                          ? "border-b-2 bg-gradient-to-br from-purple-700 to-indigo -900 hover:bg-purple-700 font-semibold"
                          : ""
                      }`}
                      onClick={() => setActiveTab("list")}
                    >
                      List View
                    </button>
                    <button
                      className={`px-4 py-2 ${
                        activeTab === "map"
                          ? "border-b-2 border-blue-600 font-semibold"
                          : ""
                      }`}
                      onClick={() => setActiveTab("map")}
                    >
                      Map View
                    </button>
                  </div>
                </div>
                {activeTab === "list" ? (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProperties.map((property) => (
                      <div
                        key={property.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                      >
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-semibold mb-1">
                            {property.title}
                          </h3>
                          <p className="text-sm text-gray-500 mb-2">
                            {property.address}
                          </p>
                          <span className="inline-block px-2 py-1 text-xs font-semibold bg-gray-200 rounded-full mb-2">
                            {property.type}
                          </span>
                          <p className="text-2xl font-bold mb-4">
                            ${property.price.toLocaleString()}
                          </p>
                          <div className="flex justify-between text-sm text-gray-500">
                            <span className="flex items-center">
                              <BedDouble className="mr-1 h-4 w-4" />
                              {property.bedrooms} bd
                            </span>
                            <span className="flex items-center">
                              <Bath className="mr-1 h-4 w-4" />
                              {property.bathrooms} ba
                            </span>
                            <span className="flex items-center">
                              <Square className="mr-1 h-4 w-4" />
                              {property.sqft} sqft
                            </span>
                          </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50">
                          <button className="w-full px-4 py-2 bg-gradient-to-br from-purple-700 to-indigo -900 hover:bg-purple-700 text-white rounded-md">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-xl font-bold mb-2">Property Map</h2>
                    <p className="text-sm text-gray-500 mb-4">
                      View properties on the map
                    </p>
                    <div className="w-full h-[500px] bg-gray-200 flex items-center justify-center">
                      <p className="text-gray-500">
                        Google Maps integration goes here
                      </p>
                    </div>
                  </div>
                )}
                {/* Nearby Properties */}
                <div className="mt-12">
                  <div className="bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-xl font-bold mb-2">
                      Nearby Properties
                    </h2>
                    <p className="text-sm text-gray-500 mb-4">
                      Discover properties in the vicinity
                    </p>
                    <div className="overflow-x-auto">
                      <div className="flex space-x-4 pb-4">
                        {properties.map((property) => (
                          <div
                            key={property.id}
                            className="w-64 flex-shrink-0 bg-white rounded-lg shadow-md overflow-hidden"
                          >
                            <img
                              src={property.image}
                              alt={property.title}
                              className="w-full h-32 object-cover"
                            />
                            <div className="p-4">
                              <h3 className="text-sm font-semibold mb-1">
                                {property.title}
                              </h3>
                              <p className="text-xs text-gray-500 mb-2">
                                {property.address}
                              </p>
                              <p className="text-lg font-bold">
                                ${property.price.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function Link({ href, children, ...props }) {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}
