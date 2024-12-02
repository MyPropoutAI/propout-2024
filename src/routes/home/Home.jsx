import AboutUs from "../../components/AboutUs";
//import ChatBot from "../../components/ChatBot";
import Features from "../../components/Features";
import HowItWorks from "../../components/HowItWorks";
import Newsletter from "../../components/NewsLetter";
import Partners from "../../components/Partners";
import PropertyListing from "../../components/PropertyListed";
import WhatPropOutIsFor from "../../components/WhatPropoutIsFor";
//import Builtfor from "./Builtfor";
import HomeHero from "./HomeHero";
//import Mobilesneak from "./Mobilesneak";

const Home = () => {
  return (
    <div className=" bg-main">
      <HomeHero />
      <PropertyListing />
      <HowItWorks />
      <WhatPropOutIsFor />
      <Features />
      <AboutUs />
      <Partners />
      <Newsletter />
    </div>
  );
};

export default Home;
