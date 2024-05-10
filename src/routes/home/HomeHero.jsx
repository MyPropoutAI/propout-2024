import { Link } from "react-router-dom";
import Hero from "../../components/Hero";
import { Button } from "../../components/ui/button";
import { Combobox } from "../../components/ui/combobox";

const HomeHero = () => {
  return (
    <Hero>
      <div className="text-center flex flex-col gap-5 text-white items-center">
        <h1 className="text-[25px] md:text-[35px] font-[700] leading-snug max-w-[700px] mx-auto">
          The Decentralized Real Estate Marketplace and Network Technology!
        </h1>
        <p className="mt-3 font-[7000] text-base">
          List Properties on the goo...
        </p>
        <div className="flex gap-5 mt-5 flex-wrap justify-center">
          <Button className="px-8 rounded-md">
            <Link to={"/home/list"}>List</Link>
          </Button>
          <Button className="px-8 rounded-md" variant="outline">
            <Link to={"/home/marketplace"}>Rent</Link>
          </Button>
          <Button className="px-8 rounded-md" variant="outline">
            <Link to={"/home/list/sell"}>Buy</Link>
          </Button>
          <Button className="px-8 rounded-md" variant="outline">
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
