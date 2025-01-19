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
  // ChevronRight,
  Linkedin,
  Home,
  DollarSign,
  // Award,
  Users,
  Square,
  Castle,
  BedDouble,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useUsers } from "../../contexts/hooks/useGetAllUsers";
import { useGetProperties } from "../../contexts/hooks/useProperty";
import CurrencySymbol from "../../lib/CurrencySymbol";
//import { Button } from "../../components/ui/button";
import { useSelector } from "react-redux";
import jwt from "jsonwebtoken";
import { FidgetSpinner } from "react-loader-spinner";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { usePropertyDetails } from "../../contexts/hooks/useGetOneUserProperties";
import ReferralCodeCopy from "../../components/RefferalCode";
//import { useNavigate } from "react-router-dom";

export default function AgentProfile() {
  const [userData, setUserData] = useState(null);
  const [agentProperties, setAgentProperties] = useState([]);
  const { id } = useParams();
  const { data: users, isLoading } = useUsers();
  const { properties } = useGetProperties();
  const [likes, setLikes] = useState(0);
  const [rating] = useState((Math.random() * 2 + 3).toFixed(1)); // Random rating between 3-5
  const user = useSelector((state) => state.auth.user);
  const decodedUser = jwt.decode(user);
  const userId = decodedUser?.id;

  useEffect(() => {
    if (users?.user && properties?.listing) {
      const foundUser = users.user.find((user) => user.id == id);
      setUserData(foundUser);

      // Filter properties for this agent
      const agentProps = properties.listing.filter(
        (prop) => prop.agent_id == id
      );
      setAgentProperties(agentProps);

      // Set random likes (for demo)
      setLikes(Math.floor(Math.random() * 100));
    }
  }, [users, properties, id]);

  //console.log(userData?.referral_code);
  const { data: safeProperty, isLoading: propertyLoading } = usePropertyDetails(
    userData?.id
  );
  //console.log(safeProperty?.listing);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">User not found</div>
      </div>
    );
  }

  // Calculate stats
  const totalListings = agentProperties.length;
  const totalValue = agentProperties.reduce(
    (sum, prop) => sum + Number(prop.price || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                {userData?.pfp ? (
                  <img
                    src={userData.pfp}
                    alt={userData.name}
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <span className="text-3xl font-bold text-purple-600">
                      {userData.name.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="absolute -bottom-2 right-0 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                  Active
                </div>
              </div>

              <div className="text-center md:text-left flex-1">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {userData.name}
                </h1>
                <p className="text-purple-100 text-lg mb-4">
                  {userData.description || "Professional Real Estate Agent"}
                </p>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="text-white ml-2">{rating}</span>
                  </div>
                  <div className="bg-white/10 rounded-full px-4 py-2 text-white">
                    {likes} Likes
                  </div>
                  <div className="bg-white/10 rounded-full px-4 py-2 text-white">
                    {totalListings} Properties
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* referral_code */}
          {userId === userData.id && (
            <div className="grid grid-cols-2 justify-evenly items-center py-6 mt-4">
              <ReferralCodeCopy
                code={`https://www.mypropout.com/auth/register/${userData?.referral_code}`}
                title="Your Referral Code"
              />
              <ReferralCodeCopy
                code={`https://www.mypropout.com/properties/store/${userData?.id}`}
                title="Your Store Link"
              />
            </div>
          )}

          {/* Contact Info */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <MapPin className="h-6 w-6 text-purple-600" />
                <span className="text-gray-600">{userData.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-6 w-6 text-purple-600" />
                <span className="text-gray-600">{userData.phone_number}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-6 w-6 text-purple-600" />
                <span className="text-gray-600">{userData.email_address}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex justify-center space-x-4">
              {Object.entries(userData.social_media || {}).map(
                ([platform, url]) => {
                  if (!url) return null;
                  const Icon = {
                    facebook: Facebook,
                    twitter: Twitter,
                    instagram: Instagram,
                    linkedin: Linkedin,
                    website: Globe,
                  }[platform];

                  return Icon ? (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-purple-600 transition-colors"
                    >
                      <Icon className="h-6 w-6" />
                    </a>
                  ) : null;
                }
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Home, label: "Total Listings", value: totalListings },
            {
              icon: DollarSign,
              label: "Portfolio Value",
              value: <CurrencySymbol amount={totalValue} listType="SELL" />,
            },
            { icon: Star, label: "Rating", value: rating },
            { icon: Users, label: "Likes", value: likes },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                <stat.icon className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-gray-600 mb-2">{stat.label}</h3>
              <p className="text-2xl font-bold text-purple-600">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Properties Grid */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Listed Properties</h2>
          {propertyLoading ? (
            <div className="w-full flex items-center justify-center">
              <FidgetSpinner />
            </div>
          ) : (
            <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
              {safeProperty?.listing.map((property, index) => (
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
                    <div className="px-4 py-3 bg-gray-50 flex justify-between items-center">
                      <Link to={`/property/${property.id}`}>
                        <button className="px-4 py-2 bg-gradient-to-br from-purple-700 to-indigo-900 hover:bg-purple-700 text-white rounded-md">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
