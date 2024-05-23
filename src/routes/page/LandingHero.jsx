import { Link } from "react-router-dom";
import { Combobox } from "../../components/ui/combobox";
import { Button } from "../../components/ui/button";
const TextContent = ({ children, className }) => (
  <div
    className={`text-center text-white max-md:max-w-full max-md:text-4xl ${className}`}
  >
    {children}
  </div>
);

const GradientText = ({ children }) => (
  <div className="flex flex-col justify-center px-2 max-md:max-w-full max-md:text-4xl">
    <div className="bg-gradient-to-r from-[#E08400] to-[#FF087F] text-transparent bg-clip-text  max-md:max-w-full max-md:text-4xl">
      {children}
    </div>
  </div>
);

// const Button = ({ children, className }) => (
//   <button
//     className={`flex items-center justify-center px-4 py-2 rounded-xl  ${className}`}
//   >
//     {children}
//   </button>
// );
const LandingHero = () => {
  return (
    <div
      className="flex flex-col items-center p-20 text-7xl  leading-[66.24px] max-md:px-5 max-md:text-4xl"
      style={{
        backgroundImage: "url('/images/Propout Landing Page.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <TextContent className="mt-36 max-md:mt-10 font-extrabold">
        Welcome to the Future of
      </TextContent>
      <div className="flex flex-col justify-center px-3 pt-3 max-w-full text-center whitespace-nowrap w-[550px] max-md:text-4xl font-extrabold ">
        <GradientText>Homeownership</GradientText>
      </div>
      <TextContent className="hidden md:block mt-10 text-lg w-[766px]">
        Making buying and selling real estate easier than ever by combining
        traditional and blockchain property transactions with smart contracts,
        leveraging the blockchain.
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

      <div className="p-4 mb-[-8rem] shadow-md mt-[2rem] z-10 md:p-6 bg-white space-x-4 flex flex-wrap justify-center rounded-md">
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

        <Button className="hover:shadow-md h-[3rem] text-[18px] bg-gradient-to-r from-blue-500 to-purple-500 text-white ">
          Find now
        </Button>
      </div>
    </div>
  );
};

export default LandingHero;
