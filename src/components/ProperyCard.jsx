import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "../lib/utils";
import CurrencySymbol from "../lib/CurrencySymbol";
import PropTypes from "prop-types";


// Helper function to determine media type based on file extension
const getMediaType = (url) => {
  if (!url) return "image"; // Default to image if no URL
  const extension = url.split(".").pop().toLowerCase();
  const videoExtensions = ["mp4", "webm", "ogg", "mov", "m4v"];
  return videoExtensions.includes(extension) ? "video" : "image";
};


export function PropertyCard({
  title,
  price,
  image,
  propertyType,
  address,
  city,
  country,

}) {
  const renderMedia = () => {
    const mediaType = getMediaType(image);


    if (mediaType === "video") {
      return (
        <video
          src={image}
          className="w-full h-32 object-cover rounded-md"
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
        src={image || "/placeholder.svg"}
        alt={title}
        className="w-full h-32 object-cover rounded-md"
        onError={(e) => {
          e.target.src = "/placeholder.svg";
        }}
      />
    );
  };

  return (
    <Card className="relative w-[20rem] h-full flex flex-col">
      <span
        className={cn(
          "absolute py-1 md:py-2 px-2 md:px-5 top-0 right-0 text-xs md:text-sm bg-[#0EFC25] text-white font-semibold z-10",
          propertyType === "SELL" ? "bg-blue-900" : "bg-[#0EFC25]"
        )}
      >
        {propertyType}
      </span>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">{renderMedia()}</CardContent>
      <CardFooter>
        <div className="flex flex-col">
          <p className="text-xl font-bold">
            <CurrencySymbol
              amount={Number(price)}
              listType={propertyType.toLocaleUpperCase()}
            />
          </p>
          <p className="text-sm text-gray-500">
            {address}, {city}, {country}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}

PropertyCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  image: PropTypes.string,
  propertyType: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,


};

PropertyCard.defaultProps = {
  image: "/placeholder.svg",


};
