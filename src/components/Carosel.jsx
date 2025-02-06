import { PropertyCard } from "./ProperyCard";
import { useGetProperties } from "@/contexts/hooks/useProperty";
import { FidgetSpinner } from "react-loader-spinner";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
//import { PropertyCard } from "./ProperyCard";

const ITEMS_PER_VIEW = 4;
export function AdsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { properties, loading } = useGetProperties();
  // const listedProperties = Array.isArray(properties?.listing)
  //   ? properties.listing
  //   : properties?.listing
  //   ? [properties.listing]
  //   : [];

  const listedProperties = Array.isArray(properties?.listing)
    ? properties.listing.filter((property) => {
        // Check if property exists and is not null
        if (!property) return false;

        // Check if it's an empty object
        if (typeof property === "object" && Object.keys(property).length === 0)
          return false;

        // Check for essential property fields
        if (
          !property.headline ||
          !property.property_price ||
          !property.list_type
        ) {
          return false;
        }

        // Check if image URLs exist and are not empty
        if (!property.img_urls || property.img_urls.trim() === "") {
          return false;
        }

        // Check if address information is complete
        if (!property.address || !property.city || !property.country) {
          return false;
        }

        return true;
      })
    : properties?.listing
    ? [properties.listing].filter((property) => {
        if (!property) return false;
        if (typeof property === "object" && Object.keys(property).length === 0)
          return false;

        // Check for essential property fields
        if (
          !property.headline ||
          !property.property_price ||
          !property.list_type
        ) {
          return false;
        }

        // Check if image URLs exist and are not empty
        if (!property.img_urls || property.img_urls.trim() === "") {
          return false;
        }

        // Check if address information is complete
        if (!property.address || !property.city || !property.country) {
          return false;
        }

        return true;
      })
    : [];
  //console.log(listedProperties);
  const extendedProperties = [
    ...listedProperties,
    ...listedProperties.slice(0, ITEMS_PER_VIEW),
  ];

  //console.log(extendedProperties);
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      // When we reach the end, quickly reset to start without animation
      if (nextIndex >= listedProperties.length) {
        setTimeout(() => {
          const carousel = document.querySelector(".carousel-container");
          if (carousel) {
            carousel.style.transition = "none";
            setCurrentIndex(0);
            // Force a reflow
            carousel.offsetHeight;
            carousel.style.transition = "transform 500ms ease-in-out";
          }
        }, 500);
      }
      return nextIndex;
    });
  }, [listedProperties.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        // When going backwards from first slide, quickly jump to end without animation
        setTimeout(() => {
          const carousel = document.querySelector(".carousel-container");
          if (carousel) {
            carousel.style.transition = "none";
            setCurrentIndex(listedProperties.length - 1);
            // Force a reflow
            carousel.offsetHeight;
            carousel.style.transition = "transform 500ms ease-in-out";
          }
        }, 500);
        return listedProperties.length;
      }
      return prevIndex - 1;
    });
  }, [listedProperties.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <>
      {loading && (
        <h2 className="text-lg font-semibold text-gray-900 uppercase mb-4">
          <FidgetSpinner />
        </h2>
      )}
      <div className="relative w-full max-w-6xl mx-auto">
        <div className="my-6 ">
          <h2 className="text-3xl text-center font-bold text-gray-900 uppercase mb-2">
            Sponsored Post
          </h2>
          <p className="text-gray-600 text-center text-sm">
            Advertisement placed here for sponsorship purposes.
          </p>
        </div>
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out carousel-container"
            style={{
              transform: `translateX(-${
                currentIndex * (100 / ITEMS_PER_VIEW)
              }%)`,
            }}
          >
            {extendedProperties.map((property) => (
              <div
                key={property.id}
                className="pl-2 md:pl-4 min-w-[25%] flex-shrink-0"
              >
                <PropertyCard
                  id={property.id}
                  title={property.headline}
                  price={property.property_price}
                  image={property.img_urls?.split(", ")[0]}
                  propertyType={property.list_type.toLocaleUpperCase()}
                  address={property.address}
                  city={property.city}
                  country={property.country}
                  mediaType={property.mediaType || "image"}
                />
              </div>
            ))}
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-2 transform -translate-y-1/2"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-2 transform -translate-y-1/2"
          onClick={nextSlide}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}
