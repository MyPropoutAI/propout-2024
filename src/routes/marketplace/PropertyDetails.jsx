import { useEffect, useState, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";

import {
  //MapPin,
  Bath,
  Bed,
  Maximize,
  Phone,
  MessageCircle,
  X,
  MapPin,
  Castle,
  Globe,
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useGetProperties } from "../../contexts/hooks/useProperty";
import { cn } from "../../lib/utils";
import CurrencySymbol from "../../lib/CurrencySymbol";
import { FidgetSpinner } from "react-loader-spinner";
//import { UseGetOneProperty } from "../../contexts/hooks/useGetOneProperty";
import { useUsers } from "../../contexts/hooks/useGetAllUsers";
import { useDispatch } from "react-redux";
import { openInspectionModal } from "../../redux/features/inspectionSlice";
import { InspectionModal } from "../../components/InspectionModal";
import { Button } from "../../components/ui/button";

// Helper function to determine media type based on file extension
const getMediaType = (url) => {
  if (!url) return "image"; // Default to image if no URL
  const extension = url.split(".").pop().toLowerCase();
  const videoExtensions = ["mp4", "webm", "ogg", "mov", "m4v"];
  return videoExtensions.includes(extension) ? "video" : "image";
};

export default function PropertyDetails() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const { properties } = useGetProperties();
  const [userData, setUserData] = useState(null);
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: users } = useUsers();
  const [coordinates, setCoordinates] = useState(null);
  const [directions, setDirections] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const dispatch = useDispatch();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const onLoad = useCallback((map) => {
    // Keep any necessary map initialization logic
  }, []);

  const onUnmount = useCallback(() => {
    // Keep any necessary cleanup logic
  }, []);

  // Map container styles
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

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

  useEffect(() => {
    if (users && users.user) {
      const usersData = Array.isArray(users.user) ? users.user : [];
      const foundUser = usersData.find((user) => user.id == property?.agent_id);
      setUserData(foundUser);
    }
  }, [users]);

  // Get property coordinates from address
  const getPropertyCoordinates = useCallback(async () => {
    if (!property?.address) return;

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          `${property.address}, ${property.city}`
        )}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();

      if (data.results && data.results[0]) {
        setCoordinates(data.results[0].geometry.location);
      }
    } catch (error) {
      console.error("Error getting coordinates:", error);
    }
  }, [property]);

  // Get user's current location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  };

  // Get directions
  const getDirections = useCallback(async () => {
    if (!userLocation || !coordinates || !isLoaded) return;

    const directionsService = new window.google.maps.DirectionsService();

    try {
      const result = await directionsService.route({
        origin: userLocation,
        destination: coordinates,
        travelMode: window.google.maps.TravelMode.DRIVING,
      });

      setDirections(result);
    } catch (error) {
      console.error("Error getting directions:", error);
    }
  }, [userLocation, coordinates, isLoaded]);

  useEffect(() => {
    getPropertyCoordinates();
    getUserLocation();
  }, [getPropertyCoordinates]);

  useEffect(() => {
    if (userLocation && coordinates) {
      getDirections();
    }
  }, [userLocation, coordinates, getDirections]);

  // Replace your existing map div with this:
  const renderMap = () => {
    if (!isLoaded || !coordinates) return null;

    return (
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={coordinates}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Property Marker */}
        <Marker
          position={coordinates}
          icon={{
            url: "/images/house-marker.png",
            scaledSize: new window.google.maps.Size(40, 40),
          }}
        />

        {/* Directions */}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    );
  };

  // Update the media rendering section:
  const renderMedia = (url) => {
    const mediaType = getMediaType(url);

    if (mediaType === "video") {
      return (
        <video
          src={url}
          className="w-full h-full object-cover"
          controls
          playsInline
          controlsList="nodownload"
          disablePictureInPicture
          onContextMenu={(e) => e.preventDefault()}
        >
          Your browser does not support the video tag.
        </video>
      );
    }

    return (
      <img
        src={url || "/placeholder.svg"}
        alt="Property"
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.src = "/placeholder.svg";
        }}
      />
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? property?.img_urls.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === property?.img_urls.length - 1 ? 0 : prev + 1
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FidgetSpinner />
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
    img_urls: property?.img_urls?.split(", ") || [],
    headline: property?.headline || "No Headline",
    address: property?.address || "No Address",
    city: property?.city || "Unknown",
    room_spec: property?.room_spec || "N/A",
    square_ft: property?.square_ft || "N/A",
    property_price: property?.property_price || "0",
    agent_info: property?.agent_info || {},
    description: property?.description || "No Description",
  };
  //console.log(userData);
  const safeUserData = {
    name: userData?.name || "Unknown",
    image: userData?.pfp || "/placeholder.svg",
    address: userData?.address || "No address",
    phone_number: userData?.phone_number || "No phone",
    email_address: userData?.email_address || "No email",
    description: userData?.description || "No description",
    twitter: userData?.social_media?.twitter || "twitter",
    linkedin: userData?.social_media?.linkedin || "linkedin",
    instagram: userData?.social_media?.instagram || "instagram",
    facebook: userData?.social_media?.facebook || "facebook",
    city: userData?.city || "city",
    country: userData?.country || "country",
    occupation: userData?.occupation || "occupation",
    website: userData?.social_media?.website || "website",
  };

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  //console.log(property?.inspection_availability)
  const handleInspectionRequest = () => {
    //console.log('Opening inspection modal...');
    const agentAvailability = property?.inspection_availability;
    //console.log(agentAvailability)
    dispatch(openInspectionModal(agentAvailability));
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
                "absolute py-2 px-5 z-10 top-0 right-0 bg-[#0EFC25] text-white font-semibold",
                safeProperty.list_type == "Sell"
                  ? "bg-blue-900"
                  : "bg-[#0EFC25]"
              )}
            >
              {safeProperty.list_type.toLocaleUpperCase()}
            </span>
            {/* Main Image */}

            <div className="mb-8">
              {/* Main Media Display */}
              <div className="relative aspect-[16/9] w-full mb-4 bg-gray-100 rounded-lg overflow-hidden">
                {safeProperty.img_urls && safeProperty.img_urls.length > 0 && (
                  <>
                    <div className="absolute inset-0">
                      {renderMedia(safeProperty.img_urls[currentImageIndex])}
                    </div>

                    {/* Navigation Arrows */}
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-colors"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-colors"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails Row */}
              <div className="grid grid-cols-4 gap-4">
                {safeProperty.img_urls?.slice(0, 4).map((url, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                      "relative aspect-square rounded-lg overflow-hidden",
                      currentImageIndex === index && "ring-2 ring-purple-600"
                    )}
                  >
                    <div className="absolute inset-0">{renderMedia(url)}</div>
                  </button>
                ))}

              </div>
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
            <div className="relative h-[400px] mb-8 rounded-lg overflow-hidden">
              {!isLoaded ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <FidgetSpinner />
                </div>
              ) : (
                <>
                  {renderMap()}
                  {coordinates && userLocation && (
                    <div className="absolute bottom-4 right-4 z-10">
                      <button
                        onClick={getDirections}
                        className="bg-purple-600 text-white px-4 py-2 rounded-md shadow-lg hover:bg-purple-700 transition-colors"
                      >
                        Get Directions
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Right Column - Agent Info and Nearby Properties */}
          <div>
            {/* Agent Info */}
            <div className="bg-gray-100 p-6 rounded-lg mb-8">
              <div className="flex items-center mb-4">
                {safeUserData.image ? (
                  <img
                    src={safeUserData.image}
                    alt="Agent Profile"
                    className="rounded-full border-4 border-white w-[5rem] h-[5rem] shadow-lg mb-4 sm:mb-0 sm:mr-6"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full flex justify-center items-center">
                    <h1 className="text-[#320051] font-bold text-lg text-center">
                      {safeUserData.name.substring(0, 2)}
                    </h1>
                  </div>
                )}
                <div>
                  <h3 className="font-bold">{safeProperty.agent_info.name}</h3>
                  <Link to={`/profile/${safeProperty.agent_id}`}>
                    <p className="text-blue-500">View profile</p>
                  </Link>
                </div>
              </div>
              <p className="mb-4 line-clamp-5">{safeUserData.description}</p>
              <div className="mb-4">
                <p>
                  <span className="font-bold">
                    <MapPin className="h-6 w-6 text-purple-600 mr-2" />
                  </span>
                  {safeUserData.address}
                </p>
                <p>
                  <span className="font-bold">
                    <Phone className="h-6 w-6 text-purple-600 mr-2" />
                  </span>
                  {safeUserData.phone_number}
                </p>
                <div className="mt-6 flex justify-center sm:justify-start space-x-4">
                  {safeUserData.facebook && (
                    <a
                      href={safeUserData.facebook}
                      className="text-gray-400 hover:text-purple-600"
                    >
                      <Facebook className="h-6 w-6" />
                    </a>
                  )}
                  {safeUserData.twitter && (
                    <a
                      href={safeUserData.twitter}
                      className="text-gray-400 hover:text-purple-600"
                    >
                      <Twitter className="h-6 w-6" />
                    </a>
                  )}
                  {safeUserData.linkedin && (
                    <a href="#" className="text-gray-400 hover:text-purple-600">
                      <Linkedin className="h-6 w-6" />
                    </a>
                  )}

                  {safeUserData.instagram && (
                    <a
                      href={safeUserData.linkedin}
                      className="text-gray-400 hover:text-purple-600"
                    >
                      <Instagram className="h-6 w-6" />
                    </a>
                  )}
                  {safeUserData.website && (
                    <a
                      href={safeUserData.website}
                      className="text-gray-400 hover:text-purple-600"
                    >
                      <Globe className="h-6 w-6" />
                    </a>
                  )}
                </div>
              </div>
              <div className="flex space-x-4">
                <Button
                  onClick={handleInspectionRequest}
                  className=" bg-purple-600 text-white py-2  hover:bg-purple-700"
                >
                  <Castle className="mr-2" /> Request Inspection
                </Button>

                <Button
                  onClick={() => openModal("call")}
                  className=" border border-blue-500 text-blue-500 "
                  size="icon"
                >
                  <Phone className="mr-2" />
                </Button>

                <Link to={`/home/chat/${safeProperty.agent_id}`}>
                  <Button className=" bg-green-500 text-white " size="icon">
                    <MessageCircle className="mr-2" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Nearby Properties */}
            {/* <div>
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
            </div> */}
            {/* Nearby Properties */}
            <div>
              <h3 className="font-bold mb-4">Properties Nearby</h3>
              {properties?.listing
                ?.filter((nearbyProperty) => nearbyProperty.id !== property.id)
                .slice(0, 3) // Limit to 3 nearby properties
                .map((nearbyProperty) => (
                  <div
                    key={nearbyProperty.id}
                    className="flex mb-4 border rounded-md shadow-sm"
                  >
                    <img
                      src={
                        nearbyProperty.img_urls?.split(", ")[0] ||
                        "/placeholder.svg"
                      }
                      alt={nearbyProperty.headline}
                      className="w-24 h-24 rounded-md mr-4 object-cover"
                    />
                    <div>
                      <p className="font-bold">
                        <CurrencySymbol
                          amount={Number(nearbyProperty.property_price)}
                          listType={nearbyProperty.list_type.toLocaleUpperCase()}
                        />
                      </p>
                      <p className="text-gray-500">
                        {nearbyProperty.city}, {nearbyProperty.address}
                      </p>
                      <div className="flex space-x-4 text-sm">
                        <span className="flex items-center">
                          <Bath className="mr-1 w-4 h-4" />{" "}
                          {nearbyProperty.room_spec}
                        </span>
                        <span className="flex items-center">
                          <Bed className="mr-1 w-4 h-4" />{" "}
                          {nearbyProperty.room_spec}
                        </span>
                        <span className="flex items-center">
                          <Maximize className="mr-1 w-4 h-4" />{" "}
                          {nearbyProperty.square_ft} ft²
                        </span>
                      </div>
                      <Link
                        to={`/property/${nearbyProperty.id}`}
                        className="text-blue-500 hover:underline mt-2 inline-block"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}

              {/* Fallback if no nearby properties */}
              {(!properties?.listing ||
                properties.listing.filter((p) => p.id !== property.id)
                  .length === 0) && (
                <p className="text-gray-500">No nearby properties found</p>
              )}
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

      <InspectionModal />
    </div>
  );
}
