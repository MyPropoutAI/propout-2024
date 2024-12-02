import AboutUs from "../../components/AboutUs";
import Features from "../../components/Features";
import HowItWorks from "../../components/HowItWorks";
import Newsletter from "../../components/NewsLetter";
import Partners from "../../components/Partners";
//import NewsLetter from "../../components/NewsLetter";
import PropertyListing from "../../components/PropertyListed";
import WhatPropOutIsFor from "../../components/WhatPropoutIsFor";
//import Builtfor from "../home/Builtfor";
//import Info from "./Info";
import LandingHero from "./LandingHero";
//import Properties from "./Properties";
// import ChatBot from "../../components/ChatBot";

function Index() {
  return (
    <>
      <LandingHero />
      <PropertyListing />
      <HowItWorks />
      <WhatPropOutIsFor />
      <Features />
      <AboutUs />
      <Partners />
      <Newsletter />
    </>
  );
}

export default Index;
