import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Globe,
  Home,
  DollarSign,
  Award,
  Users,
  ChevronRight,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { useUsers } from "../../contexts/hooks/useGetAllUsers";

export default function AgentProfile() {
  const [userData, setUserData] = useState(null);
  const { id } = useParams();
  const { data: users, isLoading } = useUsers();

  useEffect(() => {
    if (users && users.user) {
      const usersData = Array.isArray(users.user) ? users.user : [];
      const foundUser = usersData.find((user) => user.id == id);
      setUserData(foundUser);
    }
  }, [users, id]);

  // Loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (!userData) {
    return <div>User not found</div>;
  }

  // Safely access user properties with fallback values
  const safeUserData = {
    name: userData.name || "Unknown",
    image: userData.image || "/placeholder.svg",
    address: userData.address || "No address",
    phone_number: userData.phone_number || "No phone",
    email_address: userData.email_address || "No email",
    description: userData.description || "No description",
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 sm:p-10">
            <div className="flex flex-col sm:flex-row items-center">
              {safeUserData.image ? (
                <img
                  src="/placeholder.svg"
                  alt="Agent Profile"
                  className="rounded-full border-4 border-white shadow-lg mb-4 sm:mb-0 sm:mr-6"
                />
              ) : (
                <div className="w-16 h-16 rounded-full flex justify-center items-center">
                  <h1 className="text-[#320051] font-bold text-lg text-center">
                    {safeUserData.name.substring(0, 2)}
                  </h1>
                </div>
              )}

              <div className="text-center sm:text-left">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {safeUserData.name}
                </h1>
                <p className="text-purple-100 text-lg mb-2">
                  Luxury Real Estate Specialist
                </p>
                <div className="flex items-center justify-center sm:justify-start">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                  <span className="text-white ml-2">(128 reviews)</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 sm:p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-purple-600 mr-2" />
                <span>{safeUserData.address}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-purple-600 mr-2" />
                <span>{safeUserData.phone_number}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-purple-600 mr-2" />
                <span>{safeUserData.email_address}</span>
              </div>
            </div>
            <div className="mt-6 flex justify-center sm:justify-start space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-600">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-600">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-600">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-600">
                <Globe className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 p-6 sm:p-10">
          <h2 className="text-2xl font-bold mb-4">
            About {safeUserData.name.split(" ")}
          </h2>
          <p className="text-gray-600 mb-4">{safeUserData.description}</p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Home, label: "Properties Sold", value: "250+" },
            { icon: DollarSign, label: "Value Sold", value: "$100M+" },
            { icon: Award, label: "Awards", value: "15" },
            { icon: Users, label: "Happy Clients", value: "500+" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 text-center"
            >
              <stat.icon className="h-10 w-10 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{stat.label}</h3>
              <p className="text-2xl font-bold text-purple-600">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Featured Listings */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 p-6 sm:p-10">
          <h2 className="text-2xl font-bold mb-6">Featured Listings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((listing) => (
              <div
                key={listing}
                className="bg-gray-100 rounded-lg overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src="/placeholder.svg"
                    alt={`Listing ${listing}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">
                    Luxury Apartment {listing}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    123 Main St, New York, NY
                  </p>
                  <p className="text-purple-600 font-bold">$1,500,000</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <a
              href="#"
              className="inline-flex items-center text-purple-600 hover:text-purple-800"
            >
              View All Listings
              <ChevronRight className="h-5 w-5 ml-1" />
            </a>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6 sm:p-10">
          <h2 className="text-2xl font-bold mb-6">Client Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((testimonial) => (
              <div key={testimonial} className="bg-gray-100 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Image
                    src="/placeholder.svg"
                    alt={`Client ${testimonial}`}
                    width={50}
                    height={50}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">John Doe</h3>
                    <p className="text-gray-600">Satisfied Client</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  Sarah was incredible throughout the entire home buying
                  process. Her knowledge of the market and negotiation skills
                  saved us both time and money. We couldnt be happier with our
                  new home!
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <a
              href="#"
              className="inline-flex items-center text-purple-600 hover:text-purple-800"
            >
              Read More Testimonials
              <ChevronRight className="h-5 w-5 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
