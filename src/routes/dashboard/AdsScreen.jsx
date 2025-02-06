import { MessageCircle } from "lucide-react";
import AdPlanCard from "../../components/AdsPriceCard";
import { Button } from "../../components/ui/button";
import CountdownTimer from "../../components/CountdownTimer";
import { useParams } from "react-router-dom";
import PaymentInterface from "../../components/PaymentInterface";
import { useEffect, useState } from "react";
import { useGetProperties } from "../../contexts/hooks/useProperty";
import { useUsers } from "../../contexts/hooks/useGetAllUsers";
import { FidgetSpinner } from "react-loader-spinner";

export default function SponseredAdsPage() {
  const { id } = useParams();
  const { data: users } = useUsers();
  const { properties } = useGetProperties();
  const [userData, setUserData] = useState(null);
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

  useEffect(() => {
    if (users && users.user) {
      const usersData = Array.isArray(users.user) ? users.user : [];
      const foundUser = usersData.find((user) => user.id == property?.agent_id);
      setUserData(foundUser);
    }
  }, [users]);

  const handleContactSupport = () => {
    // In a real application, this could open a chat widget or redirect to a contact page
    alert(`Contacting customer support... `);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FidgetSpinner />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error || "Property not found"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <CountdownTimer />
        </div>
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          Choose Your Sponsored Ad Plan
        </h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          Select the perfect plan to boost your visibility and reach your target
          audience.
        </p>
        <div className="">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AdPlanCard
                title="Basic"
                price={0}
                features={[
                  "100,000 ad impressions",
                  "Basic targeting options",
                  "Standard analytics",
                ]}
              />
              <AdPlanCard
                title="Pro"
                price={0}
                features={[
                  "500,000 ad impressions",
                  "Advanced targeting options",
                  "Detailed analytics",
                  "Priority support",
                ]}
                highlighted={true}
              />
              <AdPlanCard
                title="Enterprise"
                price={0}
                features={[
                  "2,000,000 ad impressions",
                  "Premium targeting options",
                  "Real-time analytics",
                  "Dedicated account manager",
                  "Custom ad formats",
                ]}
              />
            </div>
          </div>
        </div>
        <PaymentInterface userId={userData?.id} propertyId={property?.id} />
        <div className="mt-12 text-center">
          <Button onClick={handleContactSupport} variant="outline">
            <MessageCircle className="mr-2 h-4 w-4" />
            Contact Customer Support
          </Button>
        </div>
      </div>
    </div>
  );
}
