import { useEffect, useState } from "react";

import {
  //MapPin,
  Bath,
  Bed,
  Maximize,
  Phone,
  Mail,
  MessageCircle,
  X,
  MapPin,
  Castle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useGetProperties } from "../../contexts/hooks/useProperty";
import { cn } from "../../lib/utils";
import CurrencySymbol from "../../lib/CurrencySymbol";
//import { UseGetOneProperty } from "../../contexts/hooks/useGetOneProperty";

export default function PropertyDetails() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const { properties } = useGetProperties();
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Safely find property when properties or id changes
    if (properties?.listing) {
      try {
        const foundProperty = properties.listing.find(
          (item) => String(item.id) === String(id)
        );

        if (foundProperty) {
          setProperty(foundProperty);
          setIsLoading(false);
        } else {
          setError("Property not found");
          setIsLoading(false);
        }
      } catch (err) {
        setError("Error finding property");
        setIsLoading(false);
        console.error(err);
      }
    }
  }, [properties, id]);
  //console.log(property);
  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  // Error state
  if (error || !property) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error || "Property not found"}
      </div>
    );
  }

  // Safe property access with default values
  const safeProperty = {
    agent_id: property?.agent_id || "N/A",
    list_type: property?.list_type || "N/A",
    img_urls: property?.img_urls || "/placeholder.svg",
    headline: property?.headline || "No Headline",
    address: property?.address || "No Address",
    city: property?.city || "Unknown",
    room_spec: property?.room_spec || "N/A",
    square_ft: property?.square_ft || "N/A",
    property_price: property?.property_price || "0",
    agent_info: property?.agent_info || {},
    description: property?.description || "No Description",
  };
  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2 relative">
            <span
              className={cn(
                "absolute py-2 px-5 z-40 top-0 right-0 bg-[#0EFC25] text-white font-semibold",
                safeProperty.list_type == "Sell"
                  ? "bg-blue-900"
                  : "bg-[#0EFC25]"
              )}
            >
              {safeProperty.list_type.toLocaleUpperCase()}
            </span>
            {/* Main Image */}
            <div className="relative h-[400px] lg:h-[500px] mb-8">
              <img
                src={safeProperty.img_urls?.replace(/,\s*$/, "")}
                alt="The Crystal Hyatt Place"
                className="rounded-lg w-full h-full object-cover"
              />
            </div>

            {/* Image Gallery */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[1, 2, 3, 4].map((img) => (
                <div
                  key={img}
                  className="relative h-24 border shadow-sm rounded-md"
                >
                  <img
                    src="/placeholder.svg"
                    alt={`Interior`}
                    className="rounded-md"
                  />
                </div>
              ))}
            </div>

            {/* Property Info */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">
                {safeProperty.headline}
              </h2>
              <p className="text-gray-500 mb-4">
                <MapPin className="text-red-500 w-8 h-8" />
                {safeProperty.address}
              </p>
              <p className="text-2xl font-bold mb-4">
                <CurrencySymbol
                  amount={Number(safeProperty.property_price)}
                  listType={safeProperty.list_type.toLocaleUpperCase()}
                />
              </p>
              <div className="flex space-x-4 mb-4">
                <span className="flex items-center">
                  <Castle className="mr-1 h-4 w-4" />
                  {safeProperty.city}
                </span>
                <span className="flex items-center">
                  <Bed className="mr-2" /> {safeProperty.room_spec} bd
                </span>
                <span className="flex items-center">
                  <Maximize className="mr-2" /> {safeProperty.square_ft} sqft
                </span>
              </div>
              <div className="mb-4">
                <h3 className="font-bold mb-2">Description</h3>
                <p>{safeProperty.description}</p>
              </div>
              {/* <div>
                <h3 className="font-bold mb-2">Home Details</h3>
                <p>
                  Just 5 minutes walk from the Empire State Building, this
                  Manhattan hotel offers free Wi-Fi and modern rooms equipped
                  with a flat-screen TV.
                </p>
              </div> */}
            </div>

            {/* Map */}
            <div className="relative h-64 mb-8">
              <img
                src="/placeholder.svg"
                alt="Property Location Map"
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Right Column - Agent Info and Nearby Properties */}
          <div>
            {/* Agent Info */}
            <div className="bg-gray-100 p-6 rounded-lg mb-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 flex justify-center items-center mb-2 rounded-full border">
                  <h1 className="text-[#320051] font-bold text-2xl text-center">
                    {safeProperty.agent_info.name.substring(0, 2)}
                  </h1>
                </div>
                <div>
                  <h3 className="font-bold">{safeProperty.agent_info.name}</h3>
                  <Link to={`/profile/${safeProperty.agent_id}`}>
                    <p className="text-blue-500">View profile</p>
                  </Link>
                </div>
              </div>
              <p className="mb-4">
                Im a positive, creative person with a passion for real estate.
                Just moved to San Francisco from New York to pursue a new
                opportunity. Always looking for new challenges and learning
                experiences.
              </p>
              <div className="mb-4">
                <p>
                  <span className="font-bold">Languages:</span> English
                </p>
                <p>
                  <span className="font-bold">Response rate:</span> 100%
                </p>
                <p>
                  <span className="font-bold">Response time:</span> within an
                  hour
                </p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => openModal("email")}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-md flex items-center justify-center"
                >
                  <Mail className="mr-2" /> Email
                </button>
                <button
                  onClick={() => openModal("call")}
                  className="flex-1 border border-blue-500 text-blue-500 py-2 rounded-md flex items-center justify-center"
                >
                  <Phone className="mr-2" /> Call
                </button>
                <Link to={`/home/chat/${safeProperty.agent_id}`}>
                  <button
                    // onClick={() => openModal("chat")}
                    className="flex-1 bg-green-500 text-white py-2 rounded-md flex items-center justify-center"
                  >
                    <MessageCircle className="mr-2" /> Chat
                  </button>
                </Link>
              </div>
            </div>

            {/* Nearby Properties */}
            <div>
              <h3 className="font-bold mb-4">Properties Nearby</h3>
              {[1, 2, 3].map((property) => (
                <div
                  key={property}
                  className="flex mb-4 border rounded-md shadow-sm"
                >
                  <img
                    src="/placeholder.svg"
                    alt={`Nearby Property ${property}`}
                    className="rounded-md mr-4"
                  />
                  <div>
                    <p className="font-bold">$1,500,000</p>
                    <p className="text-gray-500">New York, San Francisco</p>
                    <div className="flex space-x-4 text-sm">
                      <span className="flex items-center">
                        <Bath className="mr-1 w-4 h-4" /> 2
                      </span>
                      <span className="flex items-center">
                        <Bed className="mr-1 w-4 h-4" /> 3
                      </span>
                      <span className="flex items-center">
                        <Maximize className="mr-1 w-4 h-4" /> 1,200 ft²
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {modalContent === "email" && "Send Email"}
                {modalContent === "call" && "Call Agent"}
                {modalContent === "chat" && "Chat with Agent"}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            {modalContent === "email" && (
              <form>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Send Email
                </button>
              </form>
            )}
            {modalContent === "call" && (
              <div>
                <p className="mb-4">Call Jonathan Straus at:</p>
                <p className="text-xl font-bold mb-4">+1 (555) 123-4567</p>
                <button className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
                  Start Call
                </button>
              </div>
            )}
            {modalContent === "chat" && (
              <div>
                <div className="h-64 mb-4 border rounded-md p-2 overflow-y-auto">
                  {/* Chat messages would go here */}
                  <p className="text-gray-500 text-center">
                    Start chatting with Jonathan Straus
                  </p>
                </div>
                <form className="flex">
                  <input
                    type="text"
                    className="flex-grow rounded-l-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    placeholder="Type your message..."
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-r-md hover:bg-blue-600"
                  >
                    Send
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
