import AboutUs from "../../components/AboutUs";
//import ChatBot from "../../components/ChatBot";
import Features from "../../components/Features";
import HowItWorks from "../../components/HowItWorks";
import Newsletter from "../../components/NewsLetter";
import Partners from "../../components/Partners";
//import PropertyCarousel from "../../components/PropertyCarousel";
//import PropertyListing from "../../components/PropertyListed";
import WhatPropOutIsFor from "../../components/WhatPropoutIsFor";
//import Builtfor from "./Builtfor";
// import { HomeHero } from "./HomeHero";
//import Mobilesneak from "./Mobilesneak";
import HomeHero from "./HomeHero";

import { AdsCarousel } from "../../components/Carosel";
import { ResponsiveTestimonialCarousel } from "../../components/ResponsiveTestimonialCarousel";
import CounterDisplay from "../../components/DataInsight";

const Home = () => {
  return (
    <div className="">
      <HomeHero />
      <div className="">
        <AdsCarousel />
      </div>
      {/* <PropertyListing /> */}
      <HowItWorks />
      <WhatPropOutIsFor />
      <div className="my-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
          What Our Users Say About PropOut
        </h1>
        <ResponsiveTestimonialCarousel />
      </div>
      <CounterDisplay />
      <Features />
      <AboutUs />
      <Partners />
      <Newsletter />
    </div>
  );
};

export default Home;
