import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const PropertyCarousel = () => {
  return (

    <div className="hidden lg:block max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-10">

      <Carousel
        showArrows={true}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
        showStatus={false}
        showThumbs={false}
        className="bg-white shadow-xl rounded-lg overflow-hidden"
      >
        <div className="flex flex-col md:flex-row items-center">
          <img
            src="/images/illu3.jpg"
            alt="Streamlined Property Management Dashboard"
            className="w-full md:w-1/2 h-64 md:h-96 object-cover"
          />
          <div className="w-full md:w-1/2 p-6 md:p-8 bg-gray-50">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Revolutionize Your Property Management
            </h2>
            <p className="text-gray-600 mb-4">
              Experience effortless control with our intuitive dashboard. Manage
              properties, tenants, and finances all in one place.
            </p>
            <ul className="list-disc list-inside text-gray-600">
              <li>Centralized property overview</li>
              <li>Real-time financial tracking</li>
              <li>Automated tenant communication</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center">
          <img
            src="/images/illu4.jpg"
            alt="Secure Real Estate Marketplace Interface"
            className="w-full md:w-1/2 h-64 md:h-96 object-cover"
          />
          <div className="w-full md:w-1/2 p-6 md:p-8 bg-gray-50">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Secure Transactions in Our Marketplace
            </h2>
            <p className="text-gray-600 mb-4">
              Buy, sell, or rent properties with confidence. Our platform
              ensures safe, transparent, and efficient transactions.
            </p>
            <ul className="list-disc list-inside text-gray-600">
              <li>Verified property listings</li>
              <li>Secure payment gateway</li>
              <li>Smart contract integration</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center">
          <img
            src="/images/illu5.jpg"
            alt="Comprehensive Real Estate Market Analysis Tools"
            className="w-full md:w-1/2 h-64 md:h-96 object-cover"
          />
          <div className="w-full md:w-1/2 p-6 md:p-8 bg-gray-50">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Data-Driven Market Insights
            </h2>
            <p className="text-gray-600 mb-4">
              Make informed decisions with our comprehensive market analysis
              tools. Stay ahead in the dynamic real estate market.
            </p>
            <ul className="list-disc list-inside text-gray-600">
              <li>Real-time market trends</li>
              <li>Predictive pricing models</li>
              <li>Customizable reports</li>
            </ul>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default PropertyCarousel;
