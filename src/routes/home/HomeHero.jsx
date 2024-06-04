import { Link } from "react-router-dom";
import Hero from "../../components/Hero";
import { Button } from "../../components/ui/button";
import { Combobox } from "../../components/ui/combobox";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import styled, { keyframes } from "styled-components";
import { cn } from "../../lib/utils";

// const messages = ["Homeownership", "Real Estate", "New Possibilities"];

// const marquee = keyframes`
//   0% { transform: translateX(100%); }
//   100% { transform: translateX(-100%); }
// `;

// const MarqueeText = styled.div`
//   display: inline-block;
//   white-space: nowrap;
//   animation: ${marquee} 10s linear infinite;
// `;

// const MarqueeWrapper = styled.div`
//   overflow: hidden;
//   white-space: nowrap;
// `;

// const messages = [
//   "Homeownership",
//   "Real Estate ",
//   // " New Possibilities"
// ];

const TextContent = ({ children, className }) => (
  <div
    className={`text-center text-white max-md:max-w-full  max-md:text-4xl ${className}`}
  >
    {children}
  </div>
);

const GradientText = ({ children }) => (
  <div className="flex flex-col justify-center max-md:max-w-full max-md:text-4xl">
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

        {/* <div>
          <MarqueeWrapper>
            <TransitionGroup>
              {messages.map((message, index) => (
                <CSSTransition key={index} timeout={500} classNames="fade">
                  <MarqueeText>
                    <div className="flex flex-col justify-center px-3 pt-3 max-w-full text-center whitespace-nowrap min-w-[550px] overflow-hidden  max-md:text-4xl font-extrabold ">
                      <GradientText>Homeownership</GradientText>
                    </div>
                  </MarqueeText>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </MarqueeWrapper>
        </div> */}

        <div className="flex flex-col justify-center px-3 pt-3 max-w-full text-center whitespace-nowrap min-w-[550px] max-md:text-4xl font-extrabold ">
          <GradientText>Home ownership</GradientText>
        </div>
        <TextContent className="hidden md:block mt-10 text-sm lg:text-lg text-center w-[80%] lg:w-[70%]">
          Listing, buying, and selling real estate at your fingertip
        </TextContent>
        <div className="flex gap-5 mt-5 flex-wrap justify-center">
          <Button className="px-8 rounded-md text-white">
            <Link to={"/home/list"}>List</Link>
          </Button>
          <Button className="px-8 rounded-md text-white" variant="outline">
            <Link to={"/home/marketplace"}>Rent</Link>
          </Button>
          <Button className="px-8 rounded-md text-white" variant="outline">
            <Link to={"/home/list/sell"}>Buy</Link>
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
          <div className="p-4 md:p-6 bg-white gap-5 flex flex-wrap justify-center">
            <Combobox
              options={[
                {
                  value: "abuja",
                  label: "Abuja",
                },
              ]}
              trigger={"Choose area"}
              search={"area"}
              className="flex-1"
            />
            <Combobox
              options={[
                {
                  value: "good",
                  label: "Good",
                },
              ]}
              trigger={"Property status"}
              search={"status"}
              className="flex-1"
            />
            <Combobox
              options={[
                {
                  value: "abuja",
                  label: "Abuja",
                },
              ]}
              trigger={"Property type"}
              search={"type"}
              className="flex-1"
            />

            <Button className="hover:shadow-md px-10 rounded-md flex-1">
              Find now
            </Button>
          </div>
        </div>
      </div>
    </Hero>
  );
};

export default HomeHero;
