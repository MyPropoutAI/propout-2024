import { Link } from "react-router-dom";
import Hero from "../../components/Hero";
import { Button } from "../../components/ui/button";
import "react-awesome-slider/dist/styles.css";
// import Combobox2 from "../../components/Combobox";

// //UN-USED
// import { Combobox } from "../../components/ui/combobox";
// import AwesomeSlider from "react-awesome-slider";
// import { CSSTransition, TransitionGroup } from "react-transition-group";
// import styled, { keyframes } from "styled-components";
// import { cn } from "../../lib/utils";

const TextContent = ({ children, className }) => (
  <div
    className={`text-center text-white max-md:max-w-full  max-md:text-4xl ${className}`}
  >
    {children}
  </div>
);

const GradientText = ({ children }) => (
  <div className="flex flex-cl justify-center max-md:max-w-full max-md:text-4xl">
    <div className="bg-gradient-to-r from-[#E08400] to-[#FF087F] text-transparent bg-clip-text px-3  max-md:max-w-full max-md:text-4xl">
      {children}
    </div>
  </div>
);

const HomeHero = () => {
  return (
    <Hero>
      <div className="flex flex-col items-center text-7xl   max-md:px-5 max-md:text-4xl">
        <TextContent className="mt-36 max-md:mt-6 font-extrabold">
          Welcome to the Future of
        </TextContent>

        <div className="flex flex-col justify-center px-3 pt-3 max-w-full text-center whitespace-nowrap w-[550px] max-md:text-4xl font-extrabold ">
          <GradientText>Home ownership</GradientText>
        </div>
        <TextContent className="hidden md:block mt-10 text-sm lg:text-lg text-center w-[80%] lg:w-[70%]">
          Listing, buying, and selling real estate at your fingertip
        </TextContent>
        <div className="flex gap-5 mt-5 flex-wrap justify-center">
          <Button className="px-8 rounded-md text-white">
            <Link to={"/dashboard/list"}>List</Link>
          </Button>
          <Button className="px-8 rounded-md text-white" variant="outline">
            <Link to={"/marketplace"}>Marketplace</Link>
          </Button>
          <Button className="px-8 rounded-md text-white" variant="outline">
            <Link to={"/agents"}>Agents</Link>
          </Button>
          <Button className="px-8 rounded-md text-white" variant="outline">
            <Link to="/home/testnet/faucet">Testnet</Link>
          </Button>
        </div>
        <div>
          <img
            src="/images/home-hero.svg"
            alt=""
            className="w-full max-w-[500px] mx-auto"
          />
          {/* <Combobox2 /> */}
        </div>
      </div>
    </Hero>
  );
};

export default HomeHero;
