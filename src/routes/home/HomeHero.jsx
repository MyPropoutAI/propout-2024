"use client";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HomeHero() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <img
        src="/images/bg12.jpg"
        alt="Modern home interior"
        className="absolute inset-0 object-cover w-full h-full"
      />

      {/* Purple Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 to-blue-600/70"></div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Welcome to the Future of Home{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Ownership
          </span>
        </motion.h1>

        <motion.p
          className="text-md sm:text-xl text-white mb-8 max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Discover seamless real estate transactions: List, buy, and sell
          properties effortlessly. Experience smart home technology and
          AI-powered market insights at your fingertips.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link to={"/dashboard/list"}>
            <Button size="lg" variant="outline">
              List Property
            </Button>
          </Link>
          <Link to={"/marketplace"}>
            <Button size="lg" variant="default">
              Buy Properties
            </Button>
          </Link>
          <Link to={"/agents"}>
            <Button size="lg" variant="outline">
              Contact Agents
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

// import Hero from "../../components/Hero";
// import { Button } from "../../components/ui/button";
// import "react-awesome-slider/dist/styles.css";
// // import Combobox2 from "../../components/Combobox";

// // //UN-USED
// // import { Combobox } from "../../components/ui/combobox";
// // import AwesomeSlider from "react-awesome-slider";
// // import { CSSTransition, TransitionGroup } from "react-transition-group";
// // import styled, { keyframes } from "styled-components";
// // import { cn } from "../../lib/utils";

// const TextContent = ({ children, className }) => (
//   <div
//     className={`text-center text-white max-md:max-w-full  max-md:text-4xl ${className}`}
//   >
//     {children}
//   </div>
// );

// const GradientText = ({ children }) => (
//   <div className="flex flex-cl justify-center max-md:max-w-full max-md:text-5xl">
//     <div className="bg-gradient-to-r from-[#E08400] to-[#FF087F] text-transparent bg-clip-text   max-md:max-w-full max-md:text-4xl">
//       {children}
//     </div>
//   </div>
// );

// const HomeHero = () => {
//   return (
//     <Hero>
//       <div className="flex flex-col items-center text-7xl   max-md:px-5 max-md:text-4xl">
//         <TextContent className="mt-36 max-md:mt-6 font-extrabold">
//           Welcome to the Future of
//         </TextContent>

//         <div className="flex flex-col justify-center px-3 pt-2 max-w-full text-center whitespace-nowrap w-[550px] max-md:text-4xl font-extrabold ">
//           <GradientText>Home ownership</GradientText>
//         </div>
//         <TextContent className="hidden md:block mt-10 text-sm lg:text-lg text-center w-[80%] lg:w-[70%]">
//           Listing, buying, and selling real estate at your fingertip
//         </TextContent>
//         <div className="flex gap-5 mt-5 flex-wrap justify-center">
//           <Button className="px-8 rounded-md text-white">
//             <Link to={"/dashboard/list"}>List</Link>
//           </Button>
//           <Button className="px-8 rounded-md text-white" variant="outline">
//             <Link to={"/marketplace"}>Marketplace</Link>
//           </Button>
//           <Button className="px-8 rounded-md text-white" variant="outline">
//             <Link to={"/agents"}>Agents</Link>
//           </Button>
//           {/* <Button className="px-8 rounded-md text-white" variant="outline">
//             <Link to="/dashboard/task">Testnet</Link>
//           </Button> */}
//         </div>
//         <div>
//           <img
//             src="/images/home-hero.svg"
//             alt=""
//             className="w-full max-w-[50rem] mx-auto mb-[-5rem]"
//           />
//           {/* <Combobox2 /> */}
//         </div>
//       </div>
//     </Hero>
//   );
// };

// export default HomeHero;
