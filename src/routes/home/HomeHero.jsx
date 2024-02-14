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
        <div className="flex gap-5 mt-5">
          <Button className="px-8 rounded-md">List</Button>
          <Button className="px-8 rounded-md" variant="outline">
            Rent
          </Button>
          <Button className="px-8 rounded-md" variant="outline">
            Buy
          </Button>
          <Button className="px-8 rounded-md" variant="outline">
            P2P
          </Button>
        </div>
        <div>
          <img
            src="/images/home-hero.svg"
            alt=""
            className="w-full max-w-[500px] mx-auto"
          />
          <div className="p-4 md:p-6 bg-white gap-5 flex">
            <Combobox
              options={[
                {
                  value: "abuja",
                  label: "Abuja",
                },
              ]}
              trigger={"Choose area"}
              search={"area"}
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
            />

            <Button className="hover:shadow-md px-10 rounded-md">
              Find now
            </Button>
          </div>
        </div>
      </div>
    </Hero>
  );
};

export default HomeHero;
